import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loader from "./loading";

function MoreOptions({ onClose, onDelete, onShare }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const menuRef = useRef(null);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const chatId = window.location.pathname.split("/").pop();
  const [favouriteloading, setFavouriteLoading] = useState(true);
  useEffect(() => {
    const checkFavourite = async () => {
      try {
        setFavouriteLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/chats/check-favourites/${chatId}`,
          {
            email: email,
          }
        );
        setIsFavorite(response.data);
        setFavouriteLoading(false);
        console.log("Favourite status:", response.data);
      } catch (error) {
        console.error("Error fetching favourite status:", error);
      } finally {
        setFavouriteLoading(false);
      }
    };
    checkFavourite();
  }, []);
  const [handleFavouriteLoading, setHandleFavouriteLoading] = useState(false);
  const handleFavourite = async () => {
    try {
      setHandleFavouriteLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chats/toggle-favourites/${chatId}`,
        {
          email: email,
        }
      );
      setIsFavorite(response.data);
      setHandleFavouriteLoading(false);
      console.log("Favourite status toggled:", response.data);
    } catch (error) {
      console.error("Error toggling favourite status:", error);
    }
    finally
    {
      setHandleFavouriteLoading(false);
    }
  };
  return (
    <motion.div
      className="flex flex-col items-start  bg-[#0f0f0f]  border-[1.5px] border-[#272728] w-fit  text-sm gap-1 p-3 py-2   transition-all ease-in-out rounded-[10px] z-50 absolute top-[53px] right-4"
      // onClick={onClose}

      initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Starts small & slightly above
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }} // Expands normally
      exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Shrinks back to top-right
      transition={{ duration: 0, ease: "easeOut" }}
      ref={menuRef}
    >
      <div
        onClick={onShare}
        className=" text-white cursor-pointer transition-all rounded-md py-2 px-3 flex items-center justify-start gap-2 hover:bg-white hover:bg-opacity-5  w-full "
      >
        <img className="  w-[14px]" src="/share.png" />
        Share
      </div>
      <div
        onClick={handleFavourite}
        className=" text-white cursor-pointer transition-all rounded-md py-2 px-3 flex w-full items-center justify-start gap-2  hover:bg-white hover:bg-opacity-5 "
      >
        {favouriteloading||handleFavouriteLoading?<Loader w={16} h={16}/>
          :<img
          className=" w-4 transition-all"
          src={isFavorite ? "/star-filled.png" : "/star.png"}
        />}
        Add to Favourites
      </div>
      <div
        onClick={onDelete}
        className=" text-[#F87171]  cursor-pointer transition-all rounded-md py-2 px-3 flex w-full items-center justify-start gap-2  hover:bg-red-400 hover:bg-opacity-10 "
      >
        <img className=" w-5" src="/deletee.png" />
        Delete
      </div>
    </motion.div>
  );
}

export default MoreOptions;
