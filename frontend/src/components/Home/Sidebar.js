import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Navbar Component
const Navbar = ({ toggleSidebar, isSidebarOpen}) => {
  return (
    <div className={`top-0 md:hidden p-4 px-6 flex justify-between items-center w-full`}>
      <img
        src="/burger.svg"
        alt="Toggle Navigation"
        className= "w-4 cursor-pointer" 
        onClick={toggleSidebar}
      />
      <Link to={"/chat"} className="notapcolor">
        <div className="text-white p-2 px-5 bg-white bg-opacity-[0.09] rounded-lg text-sm">
          New Chat
        </div>
      </Link>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const email = "vineetalp@gmail.com";
  const location = useLocation().pathname.split("/").pop();
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
        document.removeEventListener("mousedown", handleClickOutside);
}, [modalRef]);

  const handleClick = (e, link) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(link);
    }, 200);
  };

  useEffect(() => {
    const getChatsHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/${email}`
        );
        setChatHistory(response.data.chats);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    getChatsHistory();
  }, []);

  return (
    <div
      className={`${
        isSidebarOpen ? "absolute" : "hidden"
      } z-50 flex flex-col h-full border-r-[0.2px] border-white border-opacity-10 w-[60%] md:w-full top-0`}
      ref={modalRef}
    >
      {/* Sidebar Header */}
      <div className="hidden md:flex items-center justify-center p-4 py-7 border-b-white border-b-2 border-opacity-10">
        <div className="flex md:gap-6 gap-3 w-[90%] md:flex-col flex-row justify-center items-center">
          <Link
            to={"/chat"}
            className="text-white bg-opacity-[0.09] w-full notapcolor text-sm bg-white p-2 px-10 justify-center items-center flex rounded-lg"
          >
            <span>New Chat</span>
          </Link>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex flex-col gap-2 transition-all p-2 overflow-y-auto no-scrollbar duration-[800ms] ease-in-out h-full bg-black">
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
                  handleClick(e, `/chat/${chat._id}`);
                }}
              >
                <div className="text-sm font-light">{chat.title}</div>
              </div>
            ))}
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col gap-4 items-center p-4 py-6 border-t-white border-opacity-10 bg-black">
        <div className="flex justify-center items-center gap-3">
          <img
            src="https://api.multiavatar.com/Binx Bond.svg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full bg-gray-300"
          />
          <span className="text-white text-sm">Vineet Kumar</span>
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
};

// Main Component
const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  
  return (
    <div className="w-full h-full relative top-0">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
    </div>
  );
};

export default Index;
