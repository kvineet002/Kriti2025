import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DeleteConfirmation({onClose,onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname =useLocation().pathname;
  const navigate = useNavigate();
  const chatId = pathname.split("/").pop();
   const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : {};
    const email =decodedToken&& decodedToken.email;

  const handleDelete=async()=>{
    setIsLoading(true);
    try {
      const response =await axios.delete(`${process.env.REACT_APP_API_URL}/api/chats/delete/${chatId}`,
        { params: { email:email },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        } }
      );
      console.log("Chat deleted:", response.data);
      navigate("/chat");
    } catch (error) {
      console.error("Error deleting chat:", error);
      setIsLoading(false);
    }
    finally{
      setIsLoading(false);
    }
  }
  const handleCancle=()=>{
    onDelete();
    onClose();
  }

  return (
    <motion.div
      className="flex  items-center justify-center h-full   w-full   transition-all ease-in-out  bg-opacity-80 bg-black z-[51] absolute"
      // onClick={onClose}

    
    >
      <div 
        initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Starts small & slightly above
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }} // Expands normally
        exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Shrinks back to top-right
        transition={{ duration: 0, ease: "easeOut" }}
      className="inset-0 bg-[#0f0f0f]  border-[1.5px] border-[#272728] rounded-[10px] md:w-fit w-[90%]  text-sm gap-4 md:p-10 p-6 md:py-8   flex flex-col">
        <div className="text-white text-xl text-opacity-70">
          Are you sure you want to delete this chat?
        </div>
        <div className=" ">
      <div className=" flex items-center justify-end gap-4">  
        <div 
        onClick={handleCancle}        
        className=" text-white text-opacity-70 cursor-pointer">Cancel</div>
        <div
        onClick={handleDelete}
         className="text-[#F87171]  cursor-pointer transition-all rounded-md py-2 px-3 flex items-center justify-start gap-2  bg-red-400 bg-opacity-10 ">
        <img className=" w-5" src="/deletee.png" />
          {isLoading?"Deleting...":"Delete"}</div>  
        </div></div>
      </div>
    </motion.div>
  );
}

export default DeleteConfirmation;
