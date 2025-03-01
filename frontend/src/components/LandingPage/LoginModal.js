import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { redirect, Link } from "react-router-dom";

function LoginModal({ onClose }) {
  let menuRef = useRef();
  const SERVER_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm h-screen flex justify-center items-center z-50">
      <div
        className="w-[95%] md:w-[80vw]  justify-between items-center  bg-[#0F0F0F]  md:flex flex-col md:flex-row rounded-xl overflow-hidden no-scrollbar z-50"
        ref={menuRef}
      > 
        <div className="w-full  bg-cover flex items-center object-cover justify-center">
        <img
  src="/login.png"
  className="h-[270px] md:h-full object-cover w-full"
  alt="Login"
  loading="lazy"
/>
        </div>
        <div className=" flex flex-col px-4 md:px-12 justify-center items-center text-white text-opacity-85 w-full pt-4 md:py-36">
          <div className="font-extrabold text-lg leading-9 sm:text-3xl md:text-[44px] text-center">Welcome to ogaTa.ai</div>
          <div className="text-center py-3 md:py-4 text-xs font-extralight md:text-lg">Effortlessly create AI-generated websites with zero coding required. Let's build something amazing!</div>

          <Link
            to={`${SERVER_URL}/auth/google`}
            className="px-8 md:px-16 py-2 md:py-3 mt-4 md:mt-6 flex items-center gap-4 myborder  hover:bg-white transition-all hover:bg-opacity-5 rounded-lg outline-none"
          >
            <img src="/google-icon.png" alt="Google" className="w-4 md:w-5" />
            <div className=" text-xs sm:text-base">Sign in with Google</div>
          </Link>

          <div className="font-thin text-xs py-2">Or</div>

          <Link
            to={`${SERVER_URL}/auth/github`}
            className="px-8 md:px-16 py-2 md:py-3 mb-12 md:mb-0 flex items-center gap-4 hover:bg-white transition-all hover:bg-opacity-5 myborder rounded-lg outline-none"
          >
            <img src="/github2.svg" alt="Github" className="invert w-4 md:w-5" />
            <div className="text-xs sm:text-base">Sign in with Github</div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default LoginModal;
