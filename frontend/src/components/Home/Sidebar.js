import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("/home");
  const [isOpen, setIsOpen] = useState(false);
  const location = window.location.pathname.substring(1);
  const navigate =useNavigate();
  const handleClick = (e,link) => {
    e.preventDefault() // Prevent immediate navigation
    setHovered(true) // Trigger hover effect
    setTimeout(() => {
      navigate(link) // Navigate after 300ms
    }, 200) // Delay for 300ms (adjust the delay as needed)
}
const [chatHistory, setChatHistory] = useState([]);
useEffect(() => {
  const getChatsHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/chats/vineetalp@gmail.com");
      
      // console.log('api called')
      setChatHistory(response.data.chats);
    } catch (err) {
      console.log(err);
    }
  };

  getChatsHistory();
}, []);
  const navData = [
    {
      name: "Home",
      link: "/",
      code: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.1179 11.2916V20.2916C21.1179 20.4906 21.0389 20.6813 20.8983 20.822C20.7576 20.9626 20.5668 21.0416 20.3679 21.0416H15.1179C14.919 21.0416 14.7282 20.9626 14.5876 20.822C14.4469 20.6813 14.3679 20.4906 14.3679 20.2916V15.4166C14.3679 15.3172 14.3284 15.2218 14.2581 15.1515C14.1878 15.0812 14.0924 15.0416 13.9929 15.0416H10.2429C10.1435 15.0416 10.0481 15.0812 9.97775 15.1515C9.90743 15.2218 9.86792 15.3172 9.86792 15.4166V20.2916C9.86792 20.4906 9.7889 20.6813 9.64825 20.822C9.5076 20.9626 9.31683 21.0416 9.11792 21.0416H3.86792C3.66901 21.0416 3.47824 20.9626 3.33759 20.822C3.19694 20.6813 3.11792 20.4906 3.11792 20.2916V11.2916C3.1181 10.8939 3.27626 10.5125 3.55761 10.2313L11.0576 2.73134C11.3389 2.45024 11.7203 2.29234 12.1179 2.29234C12.5156 2.29234 12.897 2.45024 13.1782 2.73134L20.6782 10.2313C20.9596 10.5125 21.1177 10.8939 21.1179 11.2916Z"
            className="transition-colors duration-300"
          />
        </svg>
      ),
    },
    {
      name: "About",
      link: "/about",
      code: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2429 11.2916C16.2429 12.1075 16.001 12.905 15.5477 13.5834C15.0945 14.2617 14.4502 14.7904 13.6965 15.1026C12.9427 15.4149 12.1133 15.4965 11.3132 15.3374C10.513 15.1782 9.778 14.7853 9.20111 14.2085C8.62422 13.6316 8.23135 12.8966 8.07219 12.0964C7.91302 11.2962 7.99471 10.4668 8.30692 9.71307C8.61913 8.95933 9.14784 8.31509 9.8262 7.86183C10.5045 7.40857 11.3021 7.16664 12.1179 7.16664C13.2116 7.16788 14.2601 7.60288 15.0334 8.3762C15.8067 9.14951 16.2417 10.198 16.2429 11.2916ZM21.8679 12.0416C21.8679 13.97 21.2961 15.8551 20.2248 17.4585C19.1534 19.0618 17.6307 20.3115 15.8491 21.0495C14.0675 21.7874 12.1071 21.9805 10.2158 21.6043C8.32448 21.2281 6.5872 20.2995 5.22363 18.9359C3.86007 17.5724 2.93147 15.8351 2.55527 13.9438C2.17906 12.0525 2.37214 10.0921 3.1101 8.31048C3.84805 6.5289 5.09774 5.00616 6.70111 3.93481C8.30449 2.86347 10.1896 2.29164 12.1179 2.29164C14.7029 2.29437 17.1813 3.32248 19.0092 5.15036C20.8371 6.97825 21.8652 9.45662 21.8679 12.0416ZM20.3679 12.0416C20.3667 10.9312 20.1416 9.83241 19.706 8.81098C19.2704 7.78954 18.6333 6.86645 17.8327 6.09689C17.0322 5.32734 16.0847 4.72713 15.0469 4.33217C14.0091 3.9372 12.9022 3.7556 11.7926 3.7982C7.37699 3.96883 3.85574 7.64664 3.86792 12.0651C3.87216 14.0765 4.61401 16.0165 5.95292 17.5176C6.4982 16.7267 7.19084 16.0484 7.99292 15.5198C8.06131 15.4746 8.14261 15.4531 8.22438 15.4585C8.30616 15.4639 8.38391 15.496 8.44574 15.5498C9.46497 16.4313 10.7675 16.9165 12.1151 16.9165C13.4627 16.9165 14.7653 16.4313 15.7845 15.5498C15.8463 15.496 15.9241 15.4639 16.0058 15.4585C16.0876 15.4531 16.1689 15.4746 16.2373 15.5198C17.0404 16.0481 17.734 16.7264 18.2801 17.5176C19.6256 16.011 20.3689 14.0616 20.3679 12.0416Z"
            className="transition-colors duration-300"
          />
        </svg>
      ),
    },
    {
      name: "Projects",
      link: "/projects",
      code: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8679 5.29164V8.29164C21.8679 8.3911 21.8284 8.48648 21.7581 8.55681C21.6878 8.62713 21.5924 8.66664 21.4929 8.66664H12.8679V4.91664C12.8679 4.81719 12.9074 4.7218 12.9778 4.65148C13.0481 4.58115 13.1435 4.54164 13.2429 4.54164H21.1179C21.3168 4.54164 21.5076 4.62066 21.6483 4.76131C21.7889 4.90196 21.8679 5.09273 21.8679 5.29164ZM21.4929 10.1666H17.3679V14.2916H21.4929C21.5924 14.2916 21.6878 14.2521 21.7581 14.1818C21.8284 14.1115 21.8679 14.0161 21.8679 13.9166V10.5416C21.8679 10.4422 21.8284 10.3468 21.7581 10.2765C21.6878 10.2061 21.5924 10.1666 21.4929 10.1666ZM8.36792 14.2916H15.8679V10.1666H8.36792V14.2916ZM2.74292 14.2916H6.86792V10.1666H2.74292C2.64346 10.1666 2.54808 10.2061 2.47775 10.2765C2.40743 10.3468 2.36792 10.4422 2.36792 10.5416V13.9166C2.36792 14.0161 2.40743 14.1115 2.47775 14.1818C2.54808 14.2521 2.64346 14.2916 2.74292 14.2916ZM21.4929 15.7916H12.8679V19.1666C12.8679 19.2661 12.9074 19.3615 12.9778 19.4318C13.0481 19.5021 13.1435 19.5416 13.2429 19.5416H21.1179C21.3168 19.5416 21.5076 19.4626 21.6483 19.322C21.7889 19.1813 21.8679 18.9906 21.8679 18.7916V16.1666C21.8679 16.0672 21.8284 15.9718 21.7581 15.9015C21.6878 15.8311 21.5924 15.7916 21.4929 15.7916ZM2.74292 8.66664H11.3679V4.91664C11.3679 4.81719 11.3284 4.7218 11.2581 4.65148C11.1878 4.58115 11.0924 4.54164 10.9929 4.54164H3.11792C2.91901 4.54164 2.72824 4.62066 2.58759 4.76131C2.44694 4.90196 2.36792 5.09273 2.36792 5.29164V8.29164C2.36792 8.3911 2.40743 8.48648 2.47775 8.55681C2.54808 8.62713 2.64346 8.66664 2.74292 8.66664ZM2.36792 16.1666V18.7916C2.36792 18.9906 2.44694 19.1813 2.58759 19.322C2.72824 19.4626 2.91901 19.5416 3.11792 19.5416H10.9929C11.0924 19.5416 11.1878 19.5021 11.2581 19.4318C11.3284 19.3615 11.3679 19.2661 11.3679 19.1666V15.7916H2.74292C2.64346 15.7916 2.54808 15.8311 2.47775 15.9015C2.40743 15.9718 2.36792 16.0672 2.36792 16.1666Z"
            className="transition-colors duration-300"
          />
        </svg>
      ),
    },
    {
      name: "Stack",
      link: "/stack",
      code: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.743 15.8938L12.118 20.9235L3.49297 15.8938C3.3222 15.8088 3.12545 15.792 2.94276 15.847C2.76007 15.9019 2.60517 16.0244 2.5096 16.1895C2.41403 16.3546 2.38496 16.5499 2.42832 16.7357C2.47167 16.9214 2.58419 17.0837 2.74297 17.1894L11.743 22.4394C11.8577 22.5063 11.988 22.5416 12.1208 22.5416C12.2535 22.5416 12.3839 22.5063 12.4986 22.4394L21.4986 17.1894C21.585 17.1405 21.6609 17.075 21.7218 16.9965C21.7827 16.918 21.8274 16.8282 21.8533 16.7324C21.8792 16.6365 21.8858 16.5364 21.8728 16.438C21.8597 16.3395 21.8272 16.2446 21.7771 16.1588C21.7271 16.073 21.6605 15.998 21.5813 15.9382C21.502 15.8783 21.4117 15.8348 21.3155 15.8102C21.2192 15.7855 21.1191 15.7802 21.0208 15.7946C20.9225 15.8089 20.8281 15.8427 20.743 15.8938Z"
            className="transition-colors duration-300"
          />
          <path
            d="M20.743 11.3938L12.118 16.4235L3.49297 11.3938C3.3222 11.3088 3.12545 11.292 2.94276 11.347C2.76007 11.4019 2.60517 11.5244 2.5096 11.6895C2.41403 11.8546 2.38496 12.0499 2.42832 12.2357C2.47167 12.4214 2.58419 12.5837 2.74297 12.6894L11.743 17.9394C11.8577 18.0063 11.988 18.0416 12.1208 18.0416C12.2535 18.0416 12.3839 18.0063 12.4986 17.9394L21.4986 12.6894C21.585 12.6405 21.6609 12.575 21.7218 12.4965C21.7827 12.418 21.8274 12.3282 21.8533 12.2324C21.8792 12.1365 21.8858 12.0364 21.8728 11.938C21.8597 11.8395 21.8272 11.7446 21.7771 11.6588C21.7271 11.573 21.6605 11.498 21.5813 11.4382C21.502 11.3783 21.4117 11.3348 21.3155 11.3102C21.2192 11.2855 21.1191 11.2802 21.0208 11.2946C20.9225 11.3089 20.8281 11.3427 20.743 11.3938Z"
            className="transition-colors duration-300"
          />
          <path
            d="M2.74291 8.18946L11.7429 13.4395C11.8576 13.5063 11.988 13.5416 12.1207 13.5416C12.2535 13.5416 12.3839 13.5063 12.4985 13.4395L21.4985 8.18946C21.6117 8.1234 21.7057 8.02883 21.771 7.91517C21.8362 7.80151 21.8706 7.67272 21.8706 7.54164C21.8706 7.41057 21.8362 7.28178 21.771 7.16812C21.7057 7.05445 21.6117 6.95988 21.4985 6.89383L12.4985 1.64383C12.3839 1.57695 12.2535 1.54172 12.1207 1.54172C11.988 1.54172 11.8576 1.57695 11.7429 1.64383L2.74291 6.89383C2.62969 6.95988 2.53576 7.05445 2.47048 7.16812C2.4052 7.28178 2.37085 7.41057 2.37085 7.54164C2.37085 7.67272 2.4052 7.80151 2.47048 7.91517C2.53576 8.02883 2.62969 8.1234 2.74291 8.18946Z"
            className="transition-colors duration-300"
          />
        </svg>
      ),
    },
    {
      name: "Contact",
      link: "/contact",
      code: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z"
            className="transition-colors duration-300"
          />
        </svg>
      ),
    },
  ];

 
  return (
    <div className="z-10 w-full md:w-auto md:p-6 py-3 px-3 md:h-full md:px-5   border-r-[0.2px] border-white border-opacity-10 bg-black">
      {/* Header section */}
      <div className="flex flex-col">
        <div className="flex md:flex-col  flex-row-reverse items-center justify-between">
          <div className="flex md:gap-6 gap-3 md:flex-col flex-row justify-center items-center">
            <div  className="text-white notapcolor text-sm bg-opacity-[0.09] bg-white p-2 px-10 justify-center items-center flex rounded-lg">
                <span>New Chat</span>
            </div>
            {/* <div className="gap-1 bg-[#4be2a328] px-3 w-full text-[#4CE6A6] text-xs md:text-sm py-[6px] flex items-center justify-center rounded-lg md:rounded-[10px]">
              <span className="blink-dot">●</span> Available for Work
            </div> */}
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
            isOpen ? 'max-h-screen opacity-100 mt-7 px-3' : 'max-h-0 opacity-0'
          } md:block overflow-hidden md:max-h-full md:opacity-100`}
        >
          
          {
            chatHistory &&
            chatHistory.map((chat) => (
              <div  key={chat._id} className={`cursor-pointer flex gap-2 items-center notapcolor text-white text-xs font-extralight ${
                location === chat.title.toLocaleLowerCase()
                  ? 'text-opacity-100 bg-white bg-opacity-10'
                  : 'text-opacity-40 hover:text-[#4CE6A6] transition-all'
              } p-3 px-4 rounded-lg`}
              onClick={(e) => {
                setActiveTab(chat.title);
                handleClick(e,`/chat/${chat._id}`)
                if (isOpen) setIsOpen(false); // Close the menu after clicking a link
              }}

              onMouseEnter={() => setHovered(chat.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`flex transition-transform transform ${
                  hovered === chat.title && location !== chat.title
                    ? 'scale-125'
                    : ''
                }`}
              >
                {React.cloneElement(navData[0].code, {
                  fill:
                    location === chat.title
                      ? '#ffffff33' // No color change if location matches item.name
                      : hovered === chat.title
                      ? '#4CE6A6' // Hovered color
                      : '#ffffff66', // Default color
                })}
              </div>
              <div className="">{chat.title}</div>
            </div>
            ))
          }
          {/* {navData.map((item) => (
            <div
              key={item.name}
              className={`cursor-pointer flex gap-2 items-center notapcolor text-white text-xs font-extralight ${
                location === item.name.toLocaleLowerCase()
                  ? 'text-opacity-100 bg-white bg-opacity-10'
                  : 'text-opacity-40 hover:text-[#4CE6A6] transition-all'
              } p-3 px-4 rounded-lg`}
              onClick={(e) => {
                setActiveTab(item.name);
                handleClick(e,`/${item.name.toLowerCase()}`)
                if (isOpen) setIsOpen(false); // Close the menu after clicking a link
              }}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`flex transition-transform transform ${
                  hovered === item.name && location !== item.name
                    ? 'scale-125'
                    : ''
                }`}
              >
                {React.cloneElement(item.code, {
                  fill:
                    location === item.name
                      ? '#ffffff33' // No color change if location matches item.name
                      : hovered === item.name
                      ? '#4CE6A6' // Hovered color
                      : '#ffffff66', // Default color
                })}
              </div>
              <div className="">{item.name}</div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
