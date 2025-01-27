import model from "../../config/gemini.js";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ChatSection() {
  const containerRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const email = "vineetalp@gmail.com";

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    // if (chatEndRef.current) {
    //   chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    // }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Add new message to the chat
  const addMessage = async (text) => {
    const newUserMessage = { role: "user", parts: [{ text }] };
    const updatedChats = [...chats, newUserMessage];

    // Optimistically update the UI
    setChats(updatedChats);

    try {
      const chatInstance = model.startChat({
        history: updatedChats.map(({ role, parts }) => ({
          role,
          parts: parts.map((part) => ({ text: part.text })),
        })),
        generationConfig: {},
      });
      console.log(updatedChats)
      console.log("Chat instance created.", chatInstance);

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
    } catch (err) {
      console.error("Error in addMessage or updating the chat:", err);
    }
  };

  // Fetch chats on component mount
  const hasFetched = useRef(false);
  useEffect(() => {
    const fetchChats = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

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
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [chatId, email]);

  return (
    <div ref={containerRef} className=" flex rounded-3xl">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto rounded-lg">
          <div className="space-y-2">
            {chats.length > 0 ? (
              chats.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md ${
                    message.role === "model" ? "bg-gray-200" : "bg-blue-500"
                  }`}
                >
                  <div className="text-sm">

                    {message.role === "model" ?<iframe
                      srcDoc={message.parts[0].text.substring(7, message.parts[0].text.length - 1)}
                      title="chat-response"
                      className={`w-full h-screen `}
                    ></iframe>:message.parts[0].text}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No chat history available.</p>
            )}
          </div>
          <div ref={chatEndRef}></div>
        </div>

        <div className="flex items-center  p-4 border-t">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={() => {
              if (inputText.trim()) {
                addMessage(inputText);
                setInputText("");
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
