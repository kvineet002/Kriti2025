// import model from "../../config/gemini.js";
import React, { useState, useEffect, useRef } from "react";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./loading.js";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatSection({ setHtmlCode, htmlCode, sandPackWidth }) {
  const containerRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
    const path = location.pathname;
  const flag = location.state?.flag;
  console.log(flag);

  
  const API_KEY =
    process.env.REACT_APP_GOOGLE_API_KEY ||
    "AIzaSyDikZzq9BC1KVbU3Qo-dOFKvLWo-_Z77wo";
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const imagePrompt = "";
  const systemPrompt = `You are a website generator AI. When given a prompt, generate a complete, functional website with the HTML
  //, CSS, and JavaScript code all combined into a single file and Note (**very important** add id to each tag) . Use  < style >
    // tags for CSS with very nice colours and <script> tags for JavaScript where user can interact within the same file. 
    // Ensure the code is clean, properly formatted, and ready to run and your 
    // output will be like 
    // (brief intro i.e. " Here your generated website with all features as per prompt and then mention the prompt" thats it)---(code)---(conclusion directly write conclustion part without mentioning that it is conclusion).
    Use colours as ${(flag?.[0]?.colors ?? "choose random from this const colorPalette =['bg-[#B5FFE1]', 'bg-[#93E5AB]', 'bg-[#65B891]', 'bg-[#4E878C]', 'bg-[#00241B]']  ['bg-[#C4BBB8]', 'bg-[#F5B0CB]', 'bg-[#DC6ACF]', 'bg-[#745C97]', 'bg-[#39375B]'] ['bg-[#223127]', 'bg-[#900D38]', 'bg-[#CE5374]', 'bg-[#DBBBF5]', 'bg-[#DDF0FF]'] ['bg-[#FEFFFE]', 'bg-[#E9EBF8]', 'bg-[#B4B8C5]', 'bg-[#A5A299]', 'bg-[#8D818C]'] ['bg-[#07020D]', 'bg-[#5DB7DE]', 'bg-[#F1E9DB]', 'bg-[#A39B8B]', 'bg-[#716A5C]']  ['bg-[#79ADDC]', 'bg-[#FFC09F]', 'bg-[#FFEE93]', 'bg-[#FCF5C7]', 'bg-[#ADF7B6]'] ['bg-[#D5B942]', 'bg-[#D9D375]', 'bg-[#E3DE8F]', 'bg-[#EDFBC1]', 'bg-[#BFCBC2]']  ['bg-[#D68FD6]', 'bg-[#DEFFF2]', 'bg-[#464F51]', 'bg-[#000009]', 'bg-[#0FF4C6]'] ['bg-[#373F51]', 'bg-[#008DD5]', 'bg-[#DFBBB1]', 'bg-[#F56476]', 'bg-[#E43F6F]'] ['bg-[#8B1E3F]', 'bg-[#3C153B]', 'bg-[#89BD9E]', 'bg-[#F0C987]', 'bg-[#DB4C40]']['bg-[#065143]', 'bg-[#129490]', 'bg-[#70B77E]', 'bg-[#E0A890]', 'bg-[#CE1483]'] ['bg-[#FFB997]', 'bg-[#F67E7D]', 'bg-[#843B62]', 'bg-[#0B032D]', 'bg-[#74546A]'] ['bg-[#4BC6B9]', 'bg-[#73C1C6]', 'bg-[#96C3CE]', 'bg-[#A79AB2]', 'bg-[#B57BA6]'] ['bg-[#7F7EFF]', 'bg-[#A390E4]', 'bg-[#C69DD2]', 'bg-[#CC8B8C]', 'bg-[#C68866]'] ['bg-[#FAC8CD]', 'bg-[#D7BCC8]', 'bg-[#98B6B1]', 'bg-[#629677]', 'bg-[#495D63]'] ['bg-[#C1B098]', 'bg-[#E9D2F4]', 'bg-[#9B9B93]', 'bg-[#39393A]', 'bg-[#63B0CD]'] ['bg-[#3A2E39]', 'bg-[#1E555C]', 'bg-[#F4D8CD]', 'bg-[#EDB183]', 'bg-[#F15152]']") }
    // Use layout as ${(flag?.[1]?.prompt ?? "- The website should have a header with a title and a navigation bar -The website should have caurosel where placeholder will be from link of pexels(do not mention it anywhere) and relevant to the prompted website Note:sometimes you provide wrong links. - The website should have a main section with a heading and a paragraph and sections according to nav items where nav links will redirected .-Section of contact us in user theme- The website should have a footer with a copyright notice.")}
  // also note that the website should be responsive. add animations and transitions.
  //
  `;
  
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemPrompt,
  });

  const chatId = path.split("/").pop();
    const token = localStorage.getItem("token");
      const decodedToken = token ? jwtDecode(token) : {};
      const email =decodedToken&& decodedToken.email;
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
console.log(path.split('/'));
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
        { params: { email },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        } }
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
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!isMounted) return;

        const fetchedChats = response.data.history || [];
        setChats(fetchedChats);

        // Only generate response if we have exactly 1 message and component is mounted
        if (fetchedChats.length === 1 && isMounted) {
          // var colorPrompt ="";
          // if(flag[0])colorPrompt="Note: Use this color"+ flag[0].colors;
          // var layoutPrompt ="";
          // if(flag&&!flag[1])layoutPrompt="Note: Use this layout"+  flag[1].prompt;
          // console.log("COlour",colorPrompt);
          // console.log("Layout",layoutPrompt);
          const text = fetchedChats[0]?.parts?.[0]?.text ;

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
              { params: { email },
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
              } },
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
    if (htmlArray.length > 0) {
      setHtmlCode(htmlArray[htmlArray.length - 1]);
    } else {
      setHtmlCode(''); // Reset if no code available
    }
  }, [htmlArray, setHtmlCode]);
  useEffect(() => {
    if (loading || htmlCode.length === 0) {
      setHtmlCode("");
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
              <div className="bg-white bg-opacity-10 flex gap-4 text-white myborder rounded-t-xl py-3  px-2">
                <div className=" ml-2">
                   Your Website</div>
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
                   (

                    (code === htmlCode && !loading)
                    ?<div className=" flex gap-2 items-center">
                      Viewing<img src="/eye.png" className=" w-3 h-3"/>
                      </div>: <div 
                      onClick={() => {  
                        setHtmlCode(code);
                      }}
                    className=" underline cursor-pointer flex items-center gap-1">
                    View website  <motion.img
          src="/redirect.png"
          className="w-3"
        />
                    </div>)
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
      className=" h-full  flex no-scrollbar rounded-3xl"
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

    { path.split('/')[2]!=="s" &&  <form
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
        </form>}
      </div>
    </div>
  );
}

export default ChatSection;
