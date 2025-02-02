import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ShareConfirmation({ onClose, onShare }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const chatId = pathname.split("/").pop();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  const [copySuccess, setCopySuccess] = useState("Copy Link");
  const [visibility, setVisibility] = useState("private");
  const sharedLink = `https://kriti2025-pi.vercel.app/chat/s/${chatId}`;
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onShare();
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);
  useEffect(()=>{
    const checkShared = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/chats//check-share/${chatId}`,
          );
          console.log("Shared code:", response.data);
        
          if(response.data){
            setVisibility("public");
          }
          else{
            setVisibility("private");
          }
        } catch (error) {
          console.error("Error fetching shared code:", error);
        }
    
      }
      checkShared();
  },[])

  const updateVisiblity = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/chats/share/${chatId}`,
         { email: email }
        
      );
      console.log("Chat updated:", response.data);
    } catch (error) {
      console.error("Error updating chat:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancle = () => {
    onShare();
    onClose();
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(sharedLink);
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("Copy Link");
      onShare();
    }, 1000);
  };

  return (
    <motion.div
      className="flex  items-center justify-center h-screen   w-full   transition-all ease-in-out  bg-opacity-80 bg-black z-[51] absolute"
      // onClick={onClose}
    >
      <div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Starts small & slightly above
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }} // Expands normally
        exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Shrinks back to top-right
        transition={{ duration: 0, ease: "easeOut" }}
        className="inset-0 bg-[#0f0f0f]  border-[1.5px] border-[#272728] rounded-[10px] md:w-fit w-[94%] gap-4  text-sm md:p-6 p-6 md:py-6   flex flex-col"
      >
        <div className=" flex flex-col gap-2">
          {" "}
          <div className="text-white text-xl">Share this chat?</div>
          <div className="text-white text-opacity-70 md:w-[85%] w-full">
            This chat can be seen by anyone with the link. Your API keys will
            visible to them.
          </div>{" "}
        </div>{" "}
        <div className=" w-full">
          <div className=" w-full">
            <select
              className="mt-1 block w-full p-2 border-gray-300 outline-none bg-black rounded-md bg-opacity-20 transition-all   myborder text-white"
              value={visibility}
              onChange={(e) => {
                setVisibility(e.target.value);
                updateVisiblity();
              }}
            >
              <option className=" bg-black  py-3" value="private">
                Private
              </option>
              <option className="bg-black  py-3" value="public">
                Public
              </option>
            </select>
          </div>
        </div>
        {visibility === "public" && (
          <div className=" text-xs bg-white  bg-opacity-5 text-white rounded-md py-3 transition-all ease-in-out duration-1000 text-opacity-80 px-3 ">
            {`kriti2025-pi.vercel.app/chat/s/${chatId}`}
          </div>
        )}
        <div className=" ">
          <div className=" flex items-center justify-end gap-2">
           
            <button
              disabled={visibility === "private"}
              onClick={handleCopy}
              className={`text-black 
               ${
                 visibility === "private"
                   ? "cursor-not-allowed opacity-50"
                   : "cursor-pointer"
               } cursor-pointer transition-all rounded-md py-2 px-3 flex items-center justify-start gap-2  bg-white  "
            `}
            >
              <img className=" w-4" src="/copy.png" />
              {copySuccess}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ShareConfirmation;
