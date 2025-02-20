import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { promptList } from "../../constants/promptList";
import Loader from "./loading";
import { jwtDecode } from "jwt-decode";

function FirstChatSection({flag}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email =decodedToken&& decodedToken.email;
 function generatePrompt() {
     const singlePrompt =
       promptList[Math.floor(Math.random() * promptList.length)];
     setisLoading1(true);
   
     // Clear the existing question
     setMessage("");
   
     // Display the prompt letter by letter
     let index = -1;
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

  console.log(flag)
  return (
    <form
      onSubmit={message.length === 0 ? (e) => e.preventDefault() : handleSend}
      disabled={loading}
      className={`h-36 md:h-32 border flex  flex-col items-end justify-between p-4 text-white myborder  px-4 rounded-xl bg-[#0F0F0F]  pointer-events-auto ${flag[0]||flag[1]? "rounded-tl-none":""}`}
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
        className="w-full p-4 px-0 bg-transparent pb-8 opacity-50 outline-none resize-none no-scrollbar"
        placeholder="Ask engine a question...."
      />


      <div className=" flex items-center justify-center gap-2 ">
      <div
          onClick={!isLoading1 ? generatePrompt : null}
          className={`select-none border-2 myborder rounded-xl p-[7px] px-4 ${
            isLoading1 ? "border-animated" : "hover:bg-opacity-5"
          } cursor-pointer font-light items-center justify-center myborder border-dashed text-sm flex gap-2 bg-white bg-opacity-10`}
        >
          <img src="/sparkle.svg" alt="Sparkle" />
          Generate a Prompt
        </div>
        <button
          disabled={message.length === 0 || loading}
          className={`text-black bg-white p-[7px] px-4 rounded-md ${
            message.length === 0||loading
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {!loading?"Send":(<div className="px-1  py-[2px]">
            <Loader w={22} h={22}/>
          </div>)}
        </button>
      </div>
    </form>
  );
}

export default FirstChatSection;
