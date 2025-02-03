import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

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
        className="w-[91vw] md:w-[80vw] justify-between items-center px-4 bg-black  myborder md:flex flex-col md:flex-row rounded-lg py-3  overflow-y-scroll md:no-scrollbar z-50"
        ref={menuRef}
      >
        <div className="pb-2 w px-3 flex text-white  w-fit">
          Welcome to Ogata.ai
        </div>

        <div className=" flex flex-col gap-3 ">
          <a
            href={`${SERVER_URL}/auth/google`}
            className=" px-3 py-2 flex items-center gap-2 bg-white text-black rounded-lg outline-none"
          >
            <img src="/google-icon.png" alt="Google" className=" w-5" />
            <div className=" text-sm sm:text-base">Sign in with Google</div>
          </a>
          <a
            href={`${SERVER_URL}/auth/google`}
            className=" px-3 py-2 flex items-center gap-2 bg-white text-black rounded-lg outline-none"
          >
            <img src="/github2.svg" alt="Github" className=" w-5" />
            <div className=" text-sm sm:text-base">Sign in with Github</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
