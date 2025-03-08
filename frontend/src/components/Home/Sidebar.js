import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import Loader from "./loading";
import { jwtDecode } from "jwt-decode";
import SettingModal from "./Setting";
function Sidebar({ closeSidebar }) {
  const [hovered, setHovered] = useState(null); // State for hover effect
  const [loading, setLoading] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Track if sidebar is open
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  const location = useLocation().pathname.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    const getChatsHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/${email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChatHistory(response.data.chats);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getChatsHistory();
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault(); // Prevent immediate navigation
    setHovered(true); // Trigger hover effect
    navigate(link);
    // window.innerWidth <768&&closeSidebar();
  };
  const groupChatsByTime = (chats) => {
    const groups = {
      Today: [],
      Yesterday: [],
      "This week": [],
      "This month": [],
      "A month ago": [],
    };

    const now = new Date();
    const utcNow = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    chats?.forEach((chat) => {
      const chatDate = new Date(chat.createdAt);
      const utcChatDate = Date.UTC(
        chatDate.getUTCFullYear(),
        chatDate.getUTCMonth(),
        chatDate.getUTCDate()
      );

      const diffDays = Math.floor(
        (utcNow - utcChatDate) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        groups["Today"].push(chat);
      } else if (diffDays === 1) {
        groups["Yesterday"].push(chat);
      } else if (diffDays <= 7) {
        groups["This week"].push(chat);
      } else if (diffDays <= 30) {
        groups["This month"].push(chat);
      } else {
        groups["A month ago"].push(chat);
      }
    });

    return groups;
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const favoriteChats = chatHistory?.filter((chat) => chat.isFavorite) || [];
  return (
    <div className="w-full transition-all flex flex-col h-full border-r-[0.2px] border-white border-opacity-10 bg-black">
      {/* Header section */}
      <div className="flex  flex-col  gap-3 items-center justify-center p-4 py-7 border-b-white border-b-2 border-opacity-10">
        <div className=" bg-black bg-gradient-to- from-white via-black to-white rounded-md w-full items-center justify-center flex">
          <img className=" w-32" src="/agota.png" />
        </div>
        <div className="flex md:gap-6 gap-3 w-[90%] md:flex-col flex-row justify-center items-center">
          <Link
            to={"/chat"}
            className="text-white bg-opacity-[0.09] w-full notapcolor text-sm bg-white hover:bg-opacity-[0.13]  p-2 px-10 justify-center items-center flex rounded-lg"
          >
            <span>New Chat</span>
          </Link>
        </div>
      </div>
{/* Setting Modal */}
      {settingModal && (
        <SettingModal
          onClose={() => setSettingModal(false)}
         />
      )}
      {/* Chat History Section */}
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (chatHistory && chatHistory.length === 0) || !chatHistory ? (
        <div className="h-full flex items-center justify-center text-white text-opacity-60">
          No chat history found
        </div>
      ) : (
        <div
          className={`flex flex-col gap-2 p-2 px-4 overflow-y-auto no-scrollbar h-full`}
        >
          {favoriteChats.length > 0 && (
            <div className=" -mb-2">
              <div className="text-xs font-medium text-white text-opacity-80 px-4 py-2 pt-3 mb-2 rounded-md uppercase tracking-wide">
                Favorites
              </div>
              {favoriteChats.map((chat) => (
                <div
                  key={chat._id}
                  className={`cursor-pointer flex mb-2 items-center text-white ${
                    location === chat._id
                      ? "text-opacity-100 bg-white bg-opacity-10"
                      : "text-opacity-40 hover:bg-opacity-5 hover:bg-white transition-all"
                  } p-2 px-4 rounded-lg`}
                  onClick={(e) => handleClick(e, `/chat/${chat._id}`)}
                  onMouseEnter={() => setHovered(chat.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="text-sm font-light">{chat.title}</div>
                </div>
              ))}
            </div>
          )}
          {Object.entries(groupChatsByTime(chatHistory)).map(
            ([section, chats]) => {
              if (chats.length === 0) return null;

              return (
                <div key={section} className="mb-4">
                  <div className="text-xs font-medium text-white text-opacity-80 px-4  py-2 pt-3 mb-2 rounded-md uppercase tracking-wide">
                    {section}
                  </div>
                  {chats
                    .slice()
                    .reverse()
                    .map((chat) => (
                      <div
                        key={chat._id}
                        className={`cursor-pointer flex mb-2 items-center notapcolor text-white ${
                          location === chat._id
                            ? "text-opacity-100 bg-white bg-opacity-10"
                            : "text-opacity-40 hover:bg-opacity-5 hover:bg-white transition-all"
                        } p-2 px-4 rounded-lg`}
                        onClick={(e) => {
                          handleClick(e, `/chat/${chat._id}`);
                          if (isOpen) setIsOpen(false);
                        }}
                        onMouseEnter={() => setHovered(chat.title)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className="text-sm font-light">{chat.title}</div>
                      </div>
                    ))}
                </div>
              );
            }
          )}
        </div>
      )}

      {/* Footer Section */}
      <div className="flex flex-col gap-4 items-center p-4 py-6 border-t-white  border-opacity-10">
        <div className=" flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <img
              src={`${decodedToken.avatar}`}
              className="w-8 h-8 rounded-full bg-gray-300"
              alt="User"
            />
            <span className="text-white  overflow-hidden text-sm">
              {decodedToken && decodedToken.name}
            </span>
          </div>
          <img onClick={()=>setSettingModal(true)} className=" w-5 h-5 overflow-hidden flex hover:rotate-12 opacity-90 transition-all cursor-pointer" src="/setting.png" />
        </div>
        <div
          onClick={handleLogout}
          className="text-white bg-opacity-[0.09] w-full notapcolor cursor-pointer text-sm bg-white p-2 px-10 justify-center items-center flex rounded-lg"
        >
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
