import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { promptList } from "../../constants/promptList";
import Loader from "./loading";
import SendingLoader from "./sending";

function FirstChatSection({flag}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const navigate = useNavigate();
  const email = "vineetalp@gmail.com";

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
        }
      );

      console.log("Message sent:", response.data);

      setMessage("");
      const id = response.data;
      navigate(`/chat/${id}`);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={message.length === 0 ? (e) => e.preventDefault() : handleSend}
      disabled={loading}
      className={`h-36 border flex  flex-col items-end justify-between p-2 text-white myborder  px-4 rounded-xl bg-[#0F0F0F]  pointer-events-auto ${flag? "rounded-tl-none":""}`}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-4 px-0  bg-transparent  pb-8  opacity-50 outline-none"
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
            <SendingLoader/>
          </div>)}
        </button>
      </div>
    </form>
  );
}

export default FirstChatSection;
