import { useState } from "react";
import { motion } from "framer-motion";
import LoginModal from "../LoginModal";
const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className=" flex  items-center  justify-between px-5 md:px-12 py-6  w-full z-50 absolute ">
      <img className=" w-36" src="/agota.png"/>

    {
      showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      ) 
    }

      <motion.div
        onClick={() => setShowLoginModal(true)}
        className="ml-auto py-1 md:text-base flex md:px-5  px-3 text-sm  items-center bg-white bg-opacity-95 rounded-md justify-center  cursor-pointer myborder   gap-2"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ opacity: 0.8 }}
      >
        <div className=" text-black">Get Started</div>
        <motion.img
          src="right-arrow.png"
          initial={{ x: 0 }}
          animate={isHovered ? { x: 8 } : { x: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="w-4"
        />
      </motion.div>
    </div>
  );
};

export default Navbar;
