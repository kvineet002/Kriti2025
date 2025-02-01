import { Link } from "react-router-dom";
import Sidebar from "../../components/Home/Sidebar";
import { useEffect, useRef, useState } from "react";
import ChatSection from "../../components/Home/ChatSection";
import MoreOptions from "../../components/Home/MoreOptions";
import SandPackCode from "./SandPackCode";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const buttonRef = useRef(null);
  const [sandpackWidth, setSandpackWidth] = useState(100); // % of total width
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dividerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
  const setShowBottom = () => {
    setShowBottomSheet(true);
  }
  setShowBottom();
}, [isUpdating]);

  const startResizing = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 40 && newWidth < 65) setSandpackWidth(newWidth);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

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
  const bottomSheetRef = useRef(null); // Reference for the bottom sheet
  const overlayRef = useRef(null); // Reference for the overlay

  // Handle click outside to close the bottom sheet
  const handleOutsideClick = (e) => {
    if (
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(e.target) &&
      !overlayRef.current.contains(e.target)
    ) {
      setShowBottomSheet(false);
    }
  };


  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
          <div className="text-white flex justify-center items-center bg-black">
            <div
              ref={buttonRef}
              onClick={() => {
                setMoreOptions(!moreOptions);
              }}
              className="flex pb-[3px] px-[6px] py-[1px] cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md"
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
        <MoreOptions buttonRef={buttonRef} onClose={handleRightClick} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
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
      <div className="w-full md:w-[80%]">
        <div className="flex h-full ">
          <div
            style={{ width: isMobile ? "100%" : `${sandpackWidth}%` }}
            className="w-auto h-[80vh] md:h-[90vh] flex flex-col"
          >
            <div className="items-center select-none py-[10.5px] hidden md:flex md:gap-2 border-b-[1px]  border-opacity-10 border-b-white justify-end px-5 text-white bg-black">
              <div
                ref={buttonRef}
                onClick={() => {
                  setMoreOptions(!moreOptions);
                }}
                className="flex font-extralight pb-[3px] opacity-80 px-[6px] py-[1px] cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md"
              >
                •••
              </div>
              <div
                onClick={() => setSandpackWidth(50)}
                className={` p-2 hover:bg-white hover:bg-opacity-10 ${
                  sandpackWidth < 80 ? "hidden" : "flex"
                } rounded-md cursor-pointer`}
              >
                <img className=" opacity-80  w-[10px]" src="/left.png" />
              </div>
            </div>

            <ChatSection {...{ setHtmlCode }} htmlCode={htmlCode} sandpackWidth={sandpackWidth}/>
          </div>

          {/* Draggable Divider */}

          <div
            ref={dividerRef}
            className="w-[3px] hover:bg-opacity-40 hidden transition-all md:flex h-full bg-white bg-opacity-5 cursor-ew-resize"
            onMouseDown={startResizing}
          />

          {/* SandPackCode for Desktop */}
          {!isMobile && (
            <motion.div
              style={{ width: `${100 - sandpackWidth}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="hidden md:flex md:flex-col items-center justify-center rounded-md"
            >
              <SandPackCode
                htmlCode={htmlCode}
                {...{ setSandpackWidth }}
                isUpdate={isUpdating}
              setIsUpdate={setIsUpdating}
              />
            </motion.div>
          )}

          {/* SandPackCode as Bottom Sheet in Mobile */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 w-full">
              <button
                onClick={() => setShowBottomSheet(true)}
                className="w-full bg-transparent  flex items-center -translate-y-1 justify-center no-tap  text-white text-center pb-6"
              >
                <motion.img
                  className="opacity-80  w-[12px]"
                  style={{rotate: "90deg"}}
                  src="/left.png"
                  animate={{ y: [4, 1, 4] }} // Moves up & down
                  transition={{
                    duration: 1.2, // Slow and smooth
                    repeat: Infinity, // Loops forever
                    ease: "easeInOut",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet for Mobile */}
      {isMobile && showBottomSheet && (
        <motion.div
          ref={bottomSheetRef}
          className="fixed bottom-0 left-0 w-full h-[85vh] text-white z-50 rounded-t-xl shadow-lg"
          initial={{ y: "100%" }} // Start off-screen
          animate={{ y: 0 }} // Animate to visible
          exit={{ y: "50%" }} // Animate off-screen when closed
          transition={{ type: "spring", stiffness: 300, damping: 60 }} // Smooth spring transition
        >
          <div className=" overflow-auto h-full">
            <SandPackCode
              htmlCode={htmlCode}
              {...{ setShowBottomSheet }}
              {...{ setSandpackWidth }}
              isUpdate={isUpdating}
              setIsUpdate={setIsUpdating}
            />
          </div>
        </motion.div>
      )}
      {showBottomSheet&&isMobile && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-90 transition-all z-40"
          onClick={() => setShowBottomSheet(false)}
        ></div>
      )}
    </div>
  );
};

export default Home;
