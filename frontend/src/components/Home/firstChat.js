import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { promptList } from "../../constants/promptList";
import Loader from "./loading";
import { jwtDecode } from "jwt-decode";
import { GoogleGenerativeAI } from "@google/generative-ai";

function FirstChatSection({flag}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email =decodedToken&& decodedToken.email;
 async function generatePrompt() {
  setisLoading1(true);
  const API_KEY =
  process.env.REACT_APP_GOOGLE_API_KEY ||
  "AIzaSyD6_5dM2ze7f-_mnlm26xeC3LJCMNFWcIg";

const genAI = new GoogleGenerativeAI(API_KEY);
const systemPrompt = `You are a prompt generator who can create give prompt with diverse genre. When given a prompt, provide a prompt to create a website Note:keep it brief and clear within 15-20 words also start with either Create a website or anything you find relavant.`;
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemPrompt,
});
  const result = await model.generateContent("generate a random prompt");
  const response =  result.response;
  const generatedPrompt = response.text();
  const singlePrompt=generatedPrompt.split(" ").join(" ");
     // Clear the existing question
     
     // Display the prompt letter by letter
     setMessage(singlePrompt[0]);
     let index = 0;
     const typingInterval = setInterval(() => {
       if (index <singlePrompt.length-1) {
         setMessage((prev) => prev + singlePrompt[index]);
         index++;
       } else {
         clearInterval(typingInterval);
         setisLoading1(false); // Stop loading once the typing is complete
       }
     }, 15); // Adjust the interval speed as needed (100ms for each letter)
   }
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chats`,
        {
          email: email,
          text: message,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("Message sent:", response.data);

      setMessage("");
      const id = response.data;
      
      navigate(`/chat/${id}`, {
        state: {flag}
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };
  const handleAttachment = () => {
    console.log("Attachment");
  }

  return (
    <form
      onSubmit={message.length === 0 ? (e) => e.preventDefault() : handleSend}
      disabled={loading}
      className={`h-28 md:h-28 border flex  flex-col p-4 select-none text-white myborder rounded-xl bg-[#0F0F0F]  pointer-events-auto ${flag[0]||flag[1]? "rounded-tl-none":""}`}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            setMessage((prev) => prev + "\n"); // Add a new line
          } else if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            handleSend(e); // Submit the form on Enter
          }
        }}
        className="w-full px-0 bg-transparent pb-8 opacity-50 outline-none resize-none no-scrollbar"
        placeholder="Ask engine a question...."
      />
      <div className=" flex justify-between items-center">


        <img 
        onClick={handleAttachment}
        title="Attach files" src="/attach.png" alt="Sparkle" className=" select-none cursor-pointer w-4 h-4" />
      <div className=" flex items-center justify-around gap-2 ">
      <button
          disabled={isLoading1}
          onClick={!isLoading1 ? generatePrompt : null}
          className={`select-none border-2 myborder rounded-md p-[6px] md:px-4 px-3 ${
            isLoading1 ? " cursor-not-allowed " : "hover:bg-opacity-5"
          }  font-light items-center justify-center myborder border-dashed  text-sm flex gap-2 bg-white bg-opacity-10`}
        >
          <img src="/sparkle.png" alt="Sparkle" className=" w-4" />
          <div className=" opacity-70 text-sm">
          Generate a Prompt</div>
        </button>
        <button
          disabled={message.length === 0 || loading}
          className={`text-black text-sm bg-white p-[6px] md:px-4 px-3 rounded-md ${
            message.length === 0||loading
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {!loading?"Send":(<div className="">
            <Loader w={20} h={20}/>
          </div>)}
        </button>
      </div>
      </div>
    </form>
  );
}

export default FirstChatSection;
