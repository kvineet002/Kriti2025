import React from "react";
import { motion } from "framer-motion";

function MoreOptions({ buttonRef, onClose }) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  if (!buttonRef.current) return null; 
  const { top, right, height } = buttonRef.current.getBoundingClientRect();

  

  return (
    <motion.div
      className="flex flex-col items-start bg-[#0f0f0f] border-[2px] border-[#272728] w-fit text-sm gap-1 p-3 py-2 transition-all ease-in-out rounded-[10px] z-[100] absolute shadow-lg"
      style={{
        top: top + height + 8, // Positions below the button with a small gap
        right: window.innerWidth - right, // Aligns to the right edge of the button
      }}
      initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }}
      transition={{ duration: 0, ease: "easeOut" }}
    >
      <div className="text-white cursor-pointer transition-all rounded-md py-2 px-3 flex items-center justify-start gap-2 hover:bg-white hover:bg-opacity-5 w-full">
        <img className="w-[14px]" src="/share.png" alt="Share" /> Share
      </div>
      <div
        onClick={() => setIsFavorite(!isFavorite)}
        className="text-white cursor-pointer transition-all rounded-md py-2 px-3 flex w-full items-center justify-start gap-2 hover:bg-white hover:bg-opacity-5"
      >
        <img className="w-4 transition-all" src={isFavorite ? "/star-filled.png" : "/star.png"} alt="Favorite" />
        Add to Favourites
      </div>
      <div className="text-[#F87171] cursor-pointer transition-all rounded-md py-2 px-3 flex w-full items-center justify-start gap-2 hover:bg-red-400 hover:bg-opacity-10">
        <img className="w-5" src="/deletee.png" alt="Delete" /> Delete
      </div>
    </motion.div>
  );
}

export default MoreOptions;
