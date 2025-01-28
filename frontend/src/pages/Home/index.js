import { Link } from "react-router-dom";
import Sidebar from "../../components/Home/Sidebar";
import { useState } from "react";
import ChatSection from "../../components/Home/ChatSection";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full relative">
      {/* Hamburger Menu */}
      <div className="text-white flex md:hidden justify-between items-center px-5 py-4">
        <img
          onClick={handleSidebar}
          src="/burger.svg"
          className="w-5 h-5 cursor-pointer"
          alt="menu"
        />
        <div className="flex items- justify-center gap-3">
        <div className="   text-white flex bg-black">
          . . .
        </div>
        <Link
          to={"/chat"}
          className="text-white bg-opacity-[0.09] px-5 notapcolor text-sm bg-white p-2 justify-center items-center flex rounded-lg"
        >
          <span>New Chat</span>
        </Link>
        </div>
      </div>

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
       <div className="w-full md:w-[80%] h-[87vh] md:h-[95vh] flex flex-col   ">
        <div className="  items-center py-3 hidden md:flex border-b-[1px] border-opacity-10 border-b-white justify-end px-10 text-white  bg-black">
          ...
        </div>
        <div className=" overflow-y-scroll no-scrollbar h-full">
        <ChatSection /></div>
      </div>
    </div>
  );
};

export default Home;

 