import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Home/Sidebar";
import { useEffect, useRef, useState } from "react";
import ChatSection from "../../components/Home/ChatSection";
import MoreOptions from "../../components/Home/MoreOptions";
import SandPackCode from "../Home/SandPackCode";
import { motion } from "framer-motion";
import DeleteConfirmation from "../../components/Home/DeleteConfirmation";
import axios from "axios";
import Loader from "../../components/Home/loading";

const Home = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [sandpackWidth, setSandpackWidth] = useState(100); // % of total width
  const dividerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    const setShowBottom = () => {
      setShowBottomSheet(true);
    };
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

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, [window.innerWidth]);
  const [loading, setLoading] = useState("Loading...");

  const triggerBottomSheet = () => {
    setShowBottomSheet(true);
  };
  const chatId = window.location.pathname.split("/").pop();

  useEffect(()=>{
    const checkShared = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/chats//check-share/${chatId}`,
          );
          console.log("Shared code:", response.data);
          if(response.data){
            setLoading("");
          }
          else{
            navigate('/');
          }
        } catch (error) {
          console.error("Error fetching shared code:", error);
        }
    
      }
      checkShared();
  },[])

  if (loading==="Loading...") {
    return (
        <div className=" text-white text-opacity-70  overflow-hidden  flex gap-2 font-bold text-xl  py-10 w-full justify-center">
         <Loader h={30} w={30}/>
         {loading}
         </div>
          )
  }

  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full relative">
      {/* Hamburger Menu */}

      {/* Sidebar */}

      {/* Content Section */}
      <div className="w-full ">
        <div className="flex h-full ">
          <div
            style={{ width: isMobile ? "100%" : `${sandpackWidth}%` }}
            className="w-auto h-[80vh] md:h-[90vh] flex flex-col"
          >
            <div className="items-center select-none  hidden md:flex md:gap-2 py-[10.5px] border-b-[1px]  border-opacity-10 border-b-white justify-end px-5 text-white bg-black relative">
              {/* Bade Screen ke liye */}
              <div>Ogata.ai</div>
              <div className="flex pb-[3px] px-[10px] py-[4px] font-medium text-xs md:text-sm bg-white text-black cursor-pointer hover:bg-white hover:bg-opacity-80 rounded-md">
                {"Get Started"}
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

            <ChatSection
              {...{ setHtmlCode }}
              htmlCode={htmlCode}
              sandpackWidth={sandpackWidth}
            />
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
                {...{ setShowBottomSheet }}
                {...{ setSandpackWidth }}
                isUpdate={isUpdating}
                setIsUpdate={setIsUpdating}
                triggerBottomSheet={triggerBottomSheet}
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
                  style={{ rotate: "90deg" }}
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
              triggerBottomSheet={triggerBottomSheet}
            />
          </div>
        </motion.div>
      )}
      {showBottomSheet && isMobile && (
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
