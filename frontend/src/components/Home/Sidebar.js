import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("/home");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname.split("/").pop();
  const navigate =useNavigate();
  const handleClick = (e,link) => {
    e.preventDefault() // Prevent immediate navigation
    setHovered(true) // Trigger hover effect
    setTimeout(() => {
      navigate(link) // Navigate after 300ms
    }, 200) // Delay for 300ms (adjust the delay as needed)
}
const [chatHistory, setChatHistory] = useState([]);
const email="vineetalp@gmail.com"
useEffect(() => {
  const getChatsHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chats/${email}`);
      
      // console.log('api called')
      setChatHistory(response.data.chats);
    } catch (err) {
      console.log(err);
    }
  };

  getChatsHistory();
}, []);
 

 
  return (
    <div className="z-10 w-full flex flex-col md:w-auto md:p-6 py-3 px-3 md:h-full md:px-5  overflow-scroll no-scrollbar  border-r-[0.2px] border-white border-opacity-10 bg-black">
      {/* Header section */}

      <div className="flex flex-col">
        <div className="flex md:flex-col  flex-row-reverse items-center justify-between">
          <div className="flex md:gap-6 gap-3 w-[90%] md:flex-col flex-row justify-center items-center">
            {/* <div className="gap-1 bg-[#4be2a328] px-6 text-[#4CE6A6] text-xs md:text-sm py-[6px] flex items-center justify-center rounded-lg md:rounded-[10px]">
              <span className="blink-dot">●</span> Online
            </div> */}
            <Link to={'/chat'}  className="text-white bg-opacity-[0.09] w-full notapcolor text-sm  bg-white p-2 px-10 justify-center items-center flex rounded-lg">
                <span>New Chat</span>
            </Link>
          </div>
          {/* Hamburger Button for Small Screens */}
          <button
  onClick={() => setIsOpen(!isOpen)}
  className={`text-white md:hidden mr-5 p-2 rounded-lg notapcolor transform transition-transform duration-300 ${
    isOpen ? "scale-110 rotate-90" : "scale-100"
  }`}
>
  {/* Icon for Hamburger Menu */}
  &#9776;
</button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:my-3 md:mt-10 gap-2 transition-all  duration-[800ms] ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 mt-7 px-3' : 'max-h-0  opacity-0'
          } md:block overflow-hidden md:max-h-full  md:opacity-100`}
        >
          
          {
            chatHistory &&
            chatHistory.slice().reverse().map((chat) => (
              <div  key={chat._id} className={`cursor-pointer flex  mb-2  items-center notapcolor  text-white ${
                location === chat._id
                  ? 'text-opacity-100 bg-white bg-opacity-10'
                  : 'text-opacity-40 hover:bg-opacity-10 hover:bg-white transition-all'
              } p-2 px-4 rounded-lg`}
              onClick={(e) => {
                setActiveTab(chat.title);
                handleClick(e,`/chat/${chat._id}`)
                if (isOpen) setIsOpen(false); // Close the menu after clicking a link
              }}

              onMouseEnter={() => setHovered(chat.title)}
              onMouseLeave={() => setHovered(null)}
            >
             
              <div className=" text-sm  font-light ">{chat.title}</div>
            </div>
            ))
          }
        
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
