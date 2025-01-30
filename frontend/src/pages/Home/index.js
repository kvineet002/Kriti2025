import { Link } from "react-router-dom";
import Sidebar from "../../components/Home/Sidebar";
import { useRef, useState } from "react";
import ChatSection from "../../components/Home/ChatSection";
import MoreOptions from "../../components/Home/MoreOptions";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const buttonRef = useRef(null);

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
   const handleRightClick = (e) => {
    if (e) e.stopPropagation();
    setMoreOptions(!moreOptions);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full relative">
      {/* Hamburger Menu */}
      <div className="text-white flex md:hidden justify-between items-center px-5 py-4">
        <img
          onClick={handleSidebar}
          src="/burger.png"
          className="w-5 h-4 cursor-pointer"
          alt="menu"
        />
        <div className="flex items-center justify-center gap-4">
          <div className="   text-white flex justify-center items-center bg-black">
            <div
              ref={buttonRef}
              onClick={()=>{setMoreOptions(!moreOptions)}}
              className=" flex    text-xs  px-2 py-[5px]  cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md "
            >
              •••
            </div>
          </div>
          <Link
            to={"/chat"}
            className="text-white bg-opacity-[0.09] px-5 notapcolor text-sm bg-white p-2 justify-center items-center flex rounded-lg"
          >
            <span>New Chat</span>
          </Link>
        </div>
      </div>
      {moreOptions && (
        <MoreOptions
        buttonRef={buttonRef}
        onClose={handleRightClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0  transition-transform duration-300 ease-in-out`}
        style={{
          width: sidebarOpen ? "65%" : "20%", // Dynamically set width for mobile screens
        }}
      >
        <Sidebar />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Content Section */}
      <div className="w-full md:w-[80%]   ">
        <div className=" flex">
          <div className="  w-full  md:w-[50%] h-[85vh]  md:h-[90vh]  flex flex-col">
            <div className="  items-center  py-2 hidden md:flex border-b-[1px] border-opacity-10 border-b-white justify-end px-10 text-white  bg-black">
              <div
                ref={buttonRef}
                onClick={()=>{setMoreOptions(!moreOptions)}}
                className=" flex font-extralight text-xs  px-2 py-[5px]  cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md "

              >
                •••
              </div>{" "}
            </div>

            <ChatSection {...{ setHtmlCode }} />
          </div>
          <div className=" w-[50%] hidden h-screen  bg-white md:flex md:flex-col items-center justify-center rounded-md">
          <div className="  items-center  w-full  py-2 hidden md:flex  border-b-[1px] border-opacity-10 border-b-white justify-end px-10 text-white  bg-black">
              <div
                ref={buttonRef}
                onClick={()=>{setMoreOptions(!moreOptions)}}
                className=" flex  text-xs  px-1  cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md "

              >
                Fork
              </div>{" "}
            </div>
            <iframe
              srcDoc={htmlCode && htmlCode.substring(4, htmlCode.length)}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              title="chat-response"
              seamless
              className={`w-full  h-full no-scrollbar`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
