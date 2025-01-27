import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Navbar = () => {
  return (
    <div className="top-0 p-2 border-b-2 border-white border-opacity-10 flex justify-between items-center">
      
    </div>
  );
};

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("/home");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);

  const toggleNav = () => {
    setIsNavOpened(!isNavOpened);
  };

  const location = useLocation().pathname.split("/").pop();
  const navigate = useNavigate();
  const handleClick = (e, link) => {
    e.preventDefault(); // Prevent immediate navigation
    setHovered(true); // Trigger hover effect
    setTimeout(() => {
      navigate(link); // Navigate after 300ms
    }, 200); // Delay for 300ms (adjust the delay as needed)
  };
  const [chatHistory, setChatHistory] = useState([]);
  const email = "vineetalp@gmail.com";
  useEffect(() => {
    const getChatsHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/${email}`
        );

        // console.log('api called')
        setChatHistory(response.data.chats);
      } catch (err) {
        console.log(err);
      }
    };

    getChatsHistory();
  }, []);

  return (
    <div>
      <div className={`${isNavOpened && "hidden"} w-full flex flex-col h-full border-r-[0.2px] border-white border-opacity-10 bg-black`}>
      {/* Header section */}
      <div className=" flex items-center justify-center p-4  py-7 border-b-white border-b-2 border-opacity-10">
        <div className="flex md:gap-6 gap-3 w-[90%] md:flex-col flex-row justify-center items-center">
          <Link
            to={"/chat"}
            className="text-white bg-opacity-[0.09] w-full notapcolor text-sm  bg-white p-2 px-10 justify-center items-center flex rounded-lg"
          >
            <span>New Chat</span>
          </Link>
        </div>
      </div>

      <div
        className={`flex flex-col gap-2 transition-all p-2 overflow-y-auto no-scrollbar h-full  duration-[800ms] ease-in-out `}
      >
        {chatHistory &&
          chatHistory
            .slice()
            .reverse()
            .map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer flex  mb-2  items-center notapcolor  text-white ${
                  location === chat._id
                    ? "text-opacity-100 bg-white bg-opacity-10"
                    : "text-opacity-40 hover:bg-opacity-10 hover:bg-white transition-all"
                } p-2 px-4 rounded-lg`}
                onClick={(e) => {
                  setActiveTab(chat.title);
                  handleClick(e, `/chat/${chat._id}`);
                  if (isOpen) setIsOpen(false); // Close the menu after clicking a link
                }}
                onMouseEnter={() => setHovered(chat.title)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className=" text-sm  font-light ">{chat.title}</div>
              </div>
            ))}
      </div>
      <div className=" flex flex-col gap-4  items-center p-4  py-6 border-t-white border-t2 border-opacity-10">
        <div className="flex justify-center items-center gap-3">
          <img
            src="https://api.multiavatar.com/Binx Bond.svg"
            className="w-8 h-8 rounded-full bg-gray-300"
          />
          <span className="text-white text-sm">Vineet Kumar</span>
        </div>
        <Link
          to={"/chat"}
          className="text-white bg-opacity-[0.09] w-full notapcolor text-sm  bg-white p-2 px-10 justify-center items-center flex rounded-lg"
        >
          <span>Log out</span>
        </Link>
      </div>
      </div>
    </div>
    
  );
}

export default Sidebar;
