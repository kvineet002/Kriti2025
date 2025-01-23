import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FirstChatSection() {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const email="vineetalp@gmail.com"

    const handleSendMessage = async (e) => {
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
        <form onSubmit={handleSendMessage} className="flex px-6 w-[60%] justify-center gap-3 items-center  p-5 myborder  bg-opacity-5 bg-white rounded-lg shadow-md">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="w-full p-2 px-4 border myborder outline-none placeholder:text-white  text-white bg-black rounded-md"
            />
            <button type="submit" className="px-4 py-2  text-black rounded-md  bg-white hover:bg-opacity-90">
                Send
            </button>
        </form>
    )
  
}

export default FirstChatSection
