import model from "../../config/gemini.js";
import React, { useState, useEffect, useRef } from "react";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./loading.js";

function ChatSection({ setHtmlCode, htmlCode, sandPackWidth }) {
  const containerRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const email = localStorage.getItem("email");
  const chatEndRef = useRef(null);
  const [htmlArray, setHtmlArray] = useState([]);
  let htmlContent = "";
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      // Use block: 'end' for better alignment
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [sandPackWidth, chats]);
  // Add new message to the chat
  const handleSend = async (e) => {
    e.preventDefault();
    const text = inputText;
    const newUserMessage = { role: "user", parts: [{ text }] };
    const updatedChats = [...chats, newUserMessage];

    // Optimistically update the UI
    setChats(updatedChats);

    setInputText("");
    try {
      setLoading(true);
      const chatInstance = model.startChat({
        history: updatedChats.map(({ role, parts }) => ({
          role,
          parts: parts.map((part) => ({ text: part.text })),
        })),
        generationConfig: {},
      });
      console.log(updatedChats);
      console.log("Chat instance created.", chatInstance);

      const result = await chatInstance.sendMessageStream([text]);
      let accumulatedText = "";

      const newModelMessage = { role: "model", parts: [{ text: "" }] };
      setChats((prevChats) => [...prevChats, newModelMessage]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        htmlContent += accumulatedText;

        setChats((prevChats) =>
          prevChats.map((chat, index) =>
            index === prevChats.length - 1
              ? { ...chat, parts: [{ text: accumulatedText }] }
              : chat
          )
        );
      }
      htmlContent = accumulatedText;
      // Save the latest question and answer to the server
      const dataToUpdate = { question: text, answer: accumulatedText };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/chats/update/${chatId}`,
        dataToUpdate,
        { params: { email } }
      );

      console.log("Chat successfully updated on the server.");
    } catch (err) {
      console.error("Error in addMessage or updating the chat:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chats on component mount
  const hasFetched = useRef(false);
  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchChats = async () => {
      hasFetched.current = true;
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/all/${chatId}`,
          {
            params: { email },
            signal: abortController.signal,
          }
        );

        if (!isMounted) return;

        const fetchedChats = response.data.history || [];
        setChats(fetchedChats);

        // Only generate response if we have exactly 1 message and component is mounted
        if (fetchedChats.length === 1 && isMounted) {
          const text = fetchedChats[0].parts[0].text;
          const chatInstance = model.startChat({
            history: fetchedChats.map(({ role, parts }) => ({
              role,
              parts: parts.map((part) => ({ text: part.text })),
            })),
          });

          const result = await chatInstance.sendMessageStream([text]);
          let accumulatedText = "";

          setChats((prev) => [
            ...prev,
            { role: "model", parts: [{ text: "" }] },
          ]);

          for await (const chunk of result.stream) {
            if (!isMounted) break;

            const chunkText = chunk.text();
            accumulatedText += chunkText;

            setChats((prev) =>
              prev.map((chat, idx) =>
                idx === prev.length - 1
                  ? { ...chat, parts: [{ text: accumulatedText }] }
                  : chat
              )
            );
          }

          if (isMounted) {
            await axios.put(
              `${process.env.REACT_APP_API_URL}/api/chats/update/${chatId}`,
              { answer: accumulatedText },
              { params: { email } }
            );
          }
        }
      } catch (error) {
        if (error.name !== "CanceledError" && isMounted) {
          console.error("Error fetching chats:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Reset fetch flag when chatId changes
    hasFetched.current = false;
    if (!hasFetched.current) {
      fetchChats();
    }

    return () => {
      isMounted = false;
      abortController.abort();
      hasFetched.current = false;
    };
  }, [chatId]); // Only depend on chatId

  const parseText = (text) => {
    let parsedText = text;

    // Convert **text** to <strong>text</strong> (bold)
    parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (parsedText.includes("https://")) {
      parsedText = parsedText.replace(/https:\/\/[^\s]+/g, (url) => {
        return `<strong href="${url}" target="_blank" rel="noopener noreferrer">IMAGE</strong>`;
      });
    }

    // Convert numbered lists (e.g., 1. Text) to <ol> and <li>
    parsedText = parsedText.replace(/(\d+)\.\s(.*?)(?=\n|$)/g, "<li>$2</li>");
    if (parsedText.includes("<li>")) {
      parsedText = parsedText.replace(/(<li>.*?<\/li>)/gs, "<ol>$1</ol>");
    }

    return parsedText;
  };

  useEffect(() => {
    const allCodes = [];
    chats.forEach((chat) => {
      if (chat.role === "model") {
        const text = chat.parts[0].text;
        const regex = /```html([\s\S]*?)```/g;
        const matches = [...text.matchAll(regex)];
        matches.forEach((match) => {
          allCodes.push(match[1].trim());
        });
      }
    });
    setHtmlArray(allCodes);
  }, [chats]);

  useEffect(() => {
    if (loading || htmlCode.length === 0) {
      const lastModelMessage = chats.findLast((msg) => msg.role === "model");
      if (lastModelMessage) {
        const chunks = lastModelMessage.parts[0].text.split("```");
        if (chunks[1]) {
          setHtmlCode(chunks[1].substring(4).trim());
        }
      }
    }
  }, [chats, loading, htmlCode, setHtmlCode]);
  const formattedMessage = (message, messageIndex) => {
    const chunks = message.split("```");

    // Calculate previous code blocks count up to the current message
    let previousCodeBlocksCount = 0;
    for (let idx = 0; idx < messageIndex; idx++) {
      const msg = chats[idx];
      if (msg.role === "model") {
        const text = msg.parts[0].text;
        const regex = /```html([\s\S]*?)```/g;
        const matches = [...text.matchAll(regex)];
        previousCodeBlocksCount += matches.length;
      }
    }

    let currentCodeBlockIndex = 0;
    return chunks.map((chunk, chunkIndex) => {
      if (chunk.trim().startsWith("html")) {
        const code = chunk.replace(/html/, "").trim();

        const htmlArrayIndex = previousCodeBlocksCount + currentCodeBlockIndex;
        currentCodeBlockIndex++;
        const versionNumber = htmlArrayIndex + 1;

        return (
          <div key={chunkIndex} className="text-white flex">
            <div className="flex flex-col my-3 -ml-1 border-white border-opacity-20">
              <div className="bg-white bg-opacity-10 flex gap-4 text-white myborder rounded-t-xl py-3 px-2">
                {htmlArrayIndex === htmlArray.length && loading
                  ? "Generating website..."
                  : "Website Generated"}
                <div className="bg-white text-black px-2 rounded-full">
                  version {versionNumber}
                </div>
              </div>
              <div className="flex px-2 p-2 myborder justify-end text-white gap-2">
                <div
                >
                  {htmlArrayIndex === htmlArray.length && loading ? (
                    <div className=" flex items-center gap-2 ">
                    
                      <Loader h={20} w={20} />
                      Generating website...
                    </div>
                  ) : (
                    <div 
                      onClick={() => {  
                        setHtmlCode(code);
                      }}
                    className=" underline cursor-pointer">
                    View website
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={chunkIndex}
            dangerouslySetInnerHTML={{ __html: parseText(chunk) }}
            className="text-white"
          ></div>
        );
      }
    });
  };
  return (
    <div
      ref={containerRef}
      className=" h-full select-none flex no-scrollbar rounded-3xl"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 md:px-[10%] transition-all overflow-y-auto no-scrollbar rounded-lg">
          <div className="space-y-2">
            {chats.length > 0 ? (
              chats.map((message, index) => (
                <div
                  key={index}
                  className={`flex text-sm ${
                    message.role === "model" ? "" : " justify-end"
                  }`}
                >
                  {message.role === "model" ? (
                    <div className=" flex flex-col gap-2 mb-2">
                      <div className=" text-white px-2">
                        {formattedMessage(message.parts[0].text, index)}
                      </div>
                    </div>
                  ) : (
                    <div className=" flex items-start justify-start gap-2">
                      <div className=" flex px-2 p-2  rounded-md bg-white  bg-opacity-[0.1]  text-white gap-0">
                        {message.parts[0].text}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className=" flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
          <div ref={chatEndRef}></div>
        </div>

        <form
          onSubmit={
            inputText.length === 0 ? (e) => e.preventDefault() : handleSend
          }
          disabled={loading}
          className="flex   justify-between  bottom-0  h-32 border  flex-col text-white myborder p-2 px-4  md:mx-[10%] mx-3 rounded-xl bg-[#0F0F0F]  pointer-events-auto"
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                setInputText((prev) => prev + "\n"); // Add new line
              } else if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
                handleSend(e); // Submit the form
              }
            }}
            className="w-full p-4 px-0 pb-8  bg-transparent opacity-50 outline-none resize-none"
            placeholder="Ask engine a question...."
          />

          <div className=" flex items-center justify-end">
            <button
              disabled={inputText.length === 0 || loading}
              className={`text-black bg-white p-[7px] px-4 rounded-md  ${
                inputText.length === 0 || loading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatSection;
