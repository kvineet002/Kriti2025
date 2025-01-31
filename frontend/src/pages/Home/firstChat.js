import { Link } from "react-router-dom";
import Sidebar from "../../components/Home/Sidebar";
import FirstChatSection from "../../components/Home/firstChat";
import { useState } from "react";
import Layout from "./Layout";

const FirstChat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative edge-prevent">
      {/* Hamburger Menu */}
      <div className="text-white flex md:hidden justify-between items-center px-5 py-4">
        <img
          onClick={handleSidebar}
          src="/burger.png"
          className="w-5 h-4  cursor-pointer"
          alt="menu"
        />
        <Link
          to={"/chat"}
          className="text-white bg-opacity-[0.09] px-5 notapcolor text-sm bg-white p-2 justify-center items-center flex rounded-lg"
        >
          <span>New Chat</span>
        </Link>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-[10%] transition-transform duration-300 ease-in-out`}
        style={{
          width: sidebarOpen ? "65%" : "20%", // Dynamically set width for mobile screens
        }}
      >
        <Sidebar />
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Content Section */}
      <div
        className="w-full md:w-[80%] flex flex-col items-center justify-center h-[80vh] md:h-full gap-5 relative"
      >
        <div className="text-white text-3xl font-bold text-center">
          What do you want to create today?
        </div>
        <FirstChatSection />

        <div className="absolute inset-0 flex items-center justify-center w-full z-50">
          <Layout />
        </div>
        
      </div>

    </div>
  );
};

export default FirstChat;