import model from "../../config/gemini.js";
import React, { useState, useEffect, useRef } from "react";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./loading.js";

function ChatSection({setHtmlCode}) {
  const containerRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const email = "vineetalp@gmail.com";
  const [htmlContent, setHtmlContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

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
        if (chunkText.includes("```")) {
          console.log("Generating website...");
          setIsGenerating(!isGenerating);
        }
        if(isGenerating){
          setHtmlContent((prevContent) => prevContent + chunkText);
        }
  

        setChats((prevChats) =>
          prevChats.map((chat, index) =>
            index === prevChats.length - 1
              ? { ...chat, parts: [{ text: accumulatedText }] }
              : chat
          )
        );
      }
      // Save the latest question and answer to the server
      const dataToUpdate = { question: text, answer: accumulatedText };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/chats/update/${chatId}`,
        dataToUpdate,
        { params: { email } }
      );

      console.log("Chat successfully updated on the server.");
      setLoading(false);
    } catch (err) {
      console.error("Error in addMessage or updating the chat:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chats on component mount
  const hasFetched = useRef(false);
  useEffect(() => {
    const fetchChats = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/all/${chatId}`,
          { params: { email } }
        );

        const fetchedChats = response.data.history || [];
        setChats(fetchedChats);

        if (fetchedChats.length === 1) {
          const text = fetchedChats[0].parts[0].text;
          const chatInstance = model.startChat({
            history: fetchedChats.map(({ role, parts }) => ({
              role,
              parts: parts.map((part) => ({ text: part.text })),
            })),
          });

          const result = await chatInstance.sendMessageStream([text]);
          let accumulatedText = "";

          const newModelMessage = { role: "model", parts: [{ text: "" }] };
          setChats((prevChats) => [...prevChats, newModelMessage]);

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            accumulatedText += chunkText;
            if (chunkText.includes("```")) {
              setIsGenerating(!isGenerating);
            }
      

            setChats((prevChats) =>
              prevChats.map((chat, index) =>
                index === prevChats.length - 1
                  ? { ...chat, parts: [{ text: accumulatedText }] }
                  : chat
              )
            );
          }

          const dataToUpdate = { answer: accumulatedText };
          await axios.put(
            `${process.env.REACT_APP_API_URL}/api/chats/update/${chatId}`,
            dataToUpdate,
            { params: { email } }
          );

          console.log("Chat successfully updated on the server.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    // hasFetched.current = false; 
    fetchChats();
  }, [ chatId]);

  const handleViewWebsite = async (text) => {
    try {
      console.log("Viewing website:", text);
      
    } catch (error) {
      console.error("Error viewing website:", error);
    }
  };

  const processChunks = (chunks) => {
    let htmlData = "";
    for (const chunk of chunks) {
      if (chunk.trim().startsWith("$$$html")) {
        setIsGenerating(true);
        const extractedHtml = chunk
          .replace(/\$\$\$html/, "") // Remove the marker
          .trim();
        htmlData += extractedHtml;
      } else {
        htmlData += chunk.trim(); // Append non-html content
      }
    }

    setIsGenerating(false); // Stop showing the "Generating website..." message
    setHtmlContent(htmlData);
  };
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
  const formattedMessage = (message) => {
    const chunks = message.split("```");
    setHtmlCode(chunks[1]);
    return chunks.map((chunk, index) => {
      if (chunk.trim().startsWith("html")) {
        return (
          <div key={index} className="text-white flex">
            
            {/* {chunk.replace(/html/, "")} */}
            <div className=" flex px-2 p-2 -ml-1 rounded-md  my-3 myborder  text-white gap-2">
                     {isGenerating?" Generating website ...":"Generated website"}
                      <div onClick={()=>setHtmlCode(chunks[1])} className="  underline cursor-pointer"
                      >
                        View website
                      </div>
                      </div>
          </div>
        );
      } else {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: parseText(chunk) }} className="text-white">
          </div>
        );
      }
    }
  );
  }
  return (
    <div ref={containerRef} className=" h-full select-none flex no-scrollbar rounded-3xl">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 md:px-[10%] transition-all overflow-y-auto no-scrollbar rounded-lg">
          <div className="space-y-2">
            {chats.length > 0 ? (
              chats.map((message, index) => (
                <div
                  key={index}
                  className={`flex text-sm${
                    message.role === "model" ? "" : ""
                  }`}
                >
                  {message.role === "model" ? (
                    // <iframe
                    //   srcDoc={message.parts[0].text.substring(
                    //     7,
                    //     message.parts[0].text.length - 1
                    //   ).replace(/<a /g, '<a target="blank" ')}
                    //   title="chat-response"
                    //   allowFullScreen="true"
                    //   className={`w-full h-screen `}
                    // ></iframe>
                    <div className=" flex flex-col gap-2 mb-2">
                      <div className=" text-white px-2">
                        {formattedMessage(message.parts[0].text)}
                        </div>
                    </div>
                  ) : (
                    <div className=" flex px-2 p-2 mb-2 rounded-md bg-white  bg-opacity-[0.15]  text-white gap-0">
                      {message.parts[0].text}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className=" flex items-center justify-center"> 
               <Loader/>
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
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 px-0  bg-transparent opacity-50 outline-none"
            placeholder="Ask engine a question...."
          />
          <div className=" flex items-center justify-end">
            <button
              disabled={inputText.length === 0 || loading}
              className={`text-black bg-white p-[7px] px-4 rounded-md  ${
                inputText.length === 0||loading
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
