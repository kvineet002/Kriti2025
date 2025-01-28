import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [hovered, setHovered] = useState(null); // State for hover effect
  const [activeTab, setActiveTab] = useState("/home");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Track if sidebar is open
  const email = "vineetalp@gmail.com";
  const location = useLocation().pathname.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    const getChatsHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/${email}` // Fixed string interpolation
        );
        setChatHistory(response.data.chats);
      } catch (err) {
        console.log(err);
      }
    };

    getChatsHistory();
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault(); // Prevent immediate navigation
    setHovered(true); // Trigger hover effect
    setTimeout(() => {
      navigate(link); // Navigate after 200ms
    }, 200); // Delay for 200ms (adjust as needed)
  };

  return (
    <div className="w-full transition-all flex flex-col h-full border-r-[0.2px] border-white border-opacity-10 bg-black">
      {/* Header section */}
      <div className="flex  flex-col  gap-3 items-center justify-center p-4 py-7 border-b-white border-b-2 border-opacity-10">
      <div className=" bg-black bg-gradient-to- from-white via-black to-white rounded-md w-full items-center justify-center flex">
          <div className="bg-gradient-to-r  overflow-hidden  font-bold text-xl from-[#4E3262] to-[#875C3B] text-transparent bg-clip-text">
            ogaTa.ai
          </div></div>
        <div className="flex md:gap-6 gap-3 w-[90%] md:flex-col flex-row justify-center items-center">
          <Link
            to={"/chat"}
            className="text-white bg-opacity-[0.09] w-full notapcolor text-sm bg-white p-2 px-10 justify-center items-center flex rounded-lg"
          >
            <span>New Chat</span>
          </Link>
        </div>
      </div>

      {/* Chat History Section */}
      <div
        className={`flex flex-col gap-2 transition-all p-2 px-4 overflow-y-auto no-scrollbar h-full duration-[800ms] ease-in-out`}
      >
        {chatHistory &&
          chatHistory
            .slice()
            .reverse()
            .map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer flex mb-2 items-center notapcolor text-white ${
                  location === chat._id
                    ? "text-opacity-100 bg-white bg-opacity-10"
                    : "text-opacity-40 hover:bg-opacity-10 hover:bg-white transition-all"
                } p-2 px-4 rounded-lg`}
                onClick={(e) => {
                  setActiveTab(chat.title);
                  handleClick(e, `/chat/${chat._id}`); // Fixed the navigation path
                  if (isOpen) setIsOpen(false); // Close the menu after clicking a link
                }}
                onMouseEnter={() => setHovered(chat.title)} // Set hovered state on mouse enter
                onMouseLeave={() => setHovered(null)} // Reset hovered state on mouse leave
              >
                <div className="text-sm font-light">{chat.title}</div>
              </div>
            ))}
      </div>

      {/* Footer Section */}
      <div className="flex flex-col gap-4 items-center p-4 py-6 border-t-white  border-opacity-10">
        <div className="flex justify-center items-center gap-3">
          <img
            src="https://api.multiavatar.com/Binx Bond.svg"
            className="w-8 h-8 rounded-full bg-gray-300"
            alt="User Avatar"
          />
          <span className="text-white  overflow-hidden text-sm">Vineet Kumar</span>
        </div>
        <Link
          to={"/chat"}
          className="text-white bg-opacity-[0.09] w-full notapcolor text-sm bg-white p-2 px-10 justify-center items-center flex rounded-lg"
        >
          <span>Log out</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
