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

  const handleGoogleLogin = async () => {
    try {

      onClose();
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm h-screen flex justify-center items-center z-50">
      <div
        className="relative w-[91vw] sm:w-[50vw] lg:w-[40vw] rounded-lg py-3 my-auto overflow-y-scroll md:no-scrollbar hero__page z-50"
        ref={menuRef}
      >
        <div className="pb-2 w-full px-3 flex justify-end"></div>

        <div className="pt-6 px-10 ">
          <p className=" text-center text-white text-3xl font-semibold">
            Discover world's best community of designers and developers
          </p>
        </div>

        <div className="mt-[40px] gap-2 flex flex-col mb-[30px]  text-white text-center">
          <div className="text-[25px]  lg:text-4xl font-extrabold">
            Welcome to Collampus
          </div>
          <div className="text-sm">Start your journey with us.</div>
        </div>
        <div className=" flex flex-col gap-1">
          <a
            href={`${SERVER_URL}/auth/google`}
            className="flex bg-[rgba(83,83,83,0.78)] w-[75%] justify-center items-center gap-3 h-8 rounded-[10px] md:w-[50%] mb-2 cursor-pointer sm:h-10 mx-auto"
            
          >
            {/* <img src="/google-icon.png" alt="Outlook" className=" w-5" /> */}
            <div className="text-white text-sm sm:text-base">
              Sign in with Google
            </div>
          </a>
        </div>

        <div className="w-[75%] md:w-[50%] flex justify-between text-xs md:text-xs mb-20 mx-auto">
          <div className="text-white">Having problem signing up?</div>
          <div className=" text-red-600 cursor-pointer hover:underline">
            <a
              href="mailto:collampus@outlook.com?subject=Reporting an Issue - Urgent Attention Required on COLLAMPUS website"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report Problem
            </a>
          </div>
        </div>
        <div className="h-[1px]  bg-black w-[90%] mb-[20px] mx-auto" />
        <div className="text-white text-center font-semibold text-xs px-3 mb-5">
          By signing in your account you agree with our Terms of Service,
          Privacy Policy, and our default Notification Settings.
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
