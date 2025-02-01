import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Loader from "../components/Home/loading";

function OAuthRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Capture query parameters after redirect
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const name = urlParams.get("name");
    const avatar = urlParams.get("avatar");

    if (token && email && name ) {
      // Store data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("avatar", avatar);

      // Redirect to the dashboard or desired route
      navigate("/chat");
    } 
    if(localStorage.getItem("token"))navigate('/chat');
    else navigate('/');
  }, [navigate]);

  return (
  <div className=" text-white text-opacity-70  overflow-hidden  flex gap-2 font-bold text-xl  py-10 w-full justify-center">
   <Loader h={30} w={30}/> Redirecting...</div>
    )
}

export default OAuthRedirectHandler;
