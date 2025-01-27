import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { promptList } from '../../constants/promptList';

function FirstChatSection() {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const email="vineetalp@gmail.com"

    function generatePrompt()  {
      const singlePrompt = promptList[Math.floor(Math.random() * promptList.length)];
      setMessage(singlePrompt);
    };
    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
    
        try {
          setLoading(true);
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chats`, {
            email:email,
            text: message,
          });
    
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
      
         <form onSubmit={message.length === 0 ? (e) => e.preventDefault() : handleSend} className="h-32 border flex  flex-col items-end text-white myborder p-2 px-4  w-[70%] rounded-xl bg-[#0F0F0F] mt-6 pointer-events-auto">
         <input
           type="text"
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           className="w-full p-4 px-0  bg-transparent opacity-50 outline-none"
           placeholder="Ask engine a question...."
         />
         <div className=" flex items-center justify-center gap-2 ">
           <div onClick={generatePrompt} className=" select-none border-dashed border-2 myborder rounded-xl hover:bg-opacity-5  p-[7px] px-4 cursor-pointer font-light items-center justify-center text-sm flex gap-2 bg-white bg-opacity-10"><img  src="/sparkle.svg" className=" " /> Generate a Prompt </div>
         <div onClick={message.length === 0 ? null : handleSend} className={`text-black bg-white p-[7px] px-4 rounded-md ${message.length === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}> Send</div>
       </div>
     </form>
    )
  
}

export default FirstChatSection
