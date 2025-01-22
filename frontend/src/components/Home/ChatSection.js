import model from "../../config/gemini.js";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ChatSection() {
  const [leftWidth, setLeftWidth] = useState(10); // Initial width of the left section
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const email = "vineetalp@gmail.com";

  const chatEndRef = useRef(null); // Ref to the end of the chat container

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Automatically scroll down when chats are updated
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Fetch Chats
  const addMessage = async (text) => {
    const newUserMessage = { role: "user", parts: [{ text }] };
    setChats((prevChats) => [...prevChats, newUserMessage]);

    try {
      const chatInstance = model.startChat({
        history: chats.map(({ role, parts }) => ({
          role,
          parts: parts.map((part) => ({ text: part.text })),
        })),
        generationConfig: {
          // Add any model-specific config if needed
        },
      });

      const result = await chatInstance.sendMessageStream([text]);
      let accumulatedText = "";

      const newModelMessage = { role: "model", parts: [{ text: "" }] };
      setChats((prevChats) => [...prevChats, newModelMessage]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;

        setChats((prevChats) =>
          prevChats.map((chat, index) =>
            index === prevChats.length - 1
              ? {
                  ...chat,
                  parts: [{ text: accumulatedText }],
                }
              : chat
          )
        );
      }

      const dataToUpdate = {
        question: text || undefined,
        answer: accumulatedText,
      };

      await axios.put(
        `http://localhost:3003/api/chats/update/${chatId}`,
        dataToUpdate,
        {
          params: { email: email },
        }
      );

      console.log("Chat successfully updated on the server.");
    } catch (err) {
      console.error("Error in addMessage or updating the chat:", err);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/chats/all/${chatId}`,
          {
            params: { email: email },
          }
        );
        console.log("Chat fetched:", response);
        setChats(response.data.history || []); // Ensure history exists
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [chatId, email]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    if (newWidth >= 200 && newWidth <= containerRect.width - 200) {
      setLeftWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-gray-800 flex select-none rounded-3xl"
      style={{ overflow: "hidden" }}
    >
      {/* Left Section */}
  

     
      <div className="flex-1 flex flex-col">
        {/* Chat Display */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Chat History</h2>
          <div className="space-y-2">
            {chats.length > 0 ? (
              chats.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 bg-white rounded-md shadow-sm border ${
                    message.role === "model" ? "" : "bg-gray-500"
                  }`}
                >
                  <p className="text-sm text-gray-700">{message.parts[0].text}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No chat history available.</p>
            )}
          </div>
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Section */}
        <div className="flex items-center justify-between p-4 bg-white border-t">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message"
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (inputText.trim()) {
                addMessage(inputText);
                setInputText("");
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    

      {/* Divider */}
      <div
        className="bg-gray-600 cursor-col-resize w-2"
        onMouseDown={handleMouseDown}
        style={{ cursor: "col-resize" }}
      ></div>
       {/* Right Section */}
        <div className="bg-gray-700 text-white h-full p-4" style={{ width: `${leftWidth}px` }}>
        <h2 className="text-lg font-bold">Right Section</h2>
        <p>Content for the Right section.</p>
      </div>
    </div>
  );
}

export default ChatSection;
