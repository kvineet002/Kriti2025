import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "./loading";
import confetti from "canvas-confetti";

function Deploy({ onClose, htmlCode }) {
  const [Loading, setLoading] = useState(false);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const chatId = pathname.split("/").pop();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  const [copySuccess, setCopySuccess] = useState("Copy Link");
  const sharedLink = `https://kriti2025-pi.vercel.app/chat/s/${chatId}`;
  const menuRef = useRef(null);
  const [isDeployed, setIsDeployed] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  function extractTitle(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.title;
  }

  const [websiteName, setWebsiteName] = useState(
    extractTitle(htmlCode).toLowerCase().split(" ").join("-")
  );
  const [randString, setrandString] = useState("");

  useEffect(() => {
    setrandString(Math.random().toString(36).substring(8));
  }, []);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        setImageLoading(true);
        const response = await axios.get(
          `https://api.microlink.io/?url=${encodeURIComponent(
            url
          )}&meta=false&screenshot=true
`
        );
        if (
          response.data.status === "success" &&
          response.data.data.screenshot.url
        ) {
          setImageSrc(response.data.data.screenshot.url);
        } else {
          console.error("No screenshot found in response.");
        }
        setImageLoading(false);
      } catch (error) {
        console.error("Error fetching screenshot:", error);
      }
      finally {
        setImageLoading(false);
      }
    };

    fetchScreenshot();
  }, [url]);

  const handleDeploy = async () => {
    try {
        setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_DEPLOY_URL}/deploy`,
        {
          html: htmlCode,
        websiteName: websiteName + "-" + randString,
        }
      );
      
    setUrl(response.data.url);

      const response2 = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/deploys/add`,
        {
          email: email,
          websiteName: extractTitle(htmlCode),
          websiteLink: response.data.url,
          websiteCode: htmlCode,
        websiteImage: imageSrc||"/placeholder.png",
        }
      );
      setLoading(false);
      setIsDeployed(true);
      confetti();
      // window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);
  const [loadingDeploy, setLoadingDeploy] = useState(false);
  useEffect(() => {
    const checkDeployed = async () => {
      try {
        setLoadingDeploy(true);
        const checkDeploy = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/deploys/check/${email}`,
          {
            websiteCode: htmlCode,
          }
        );
        if (checkDeploy.data.status) {
          setUrl(checkDeploy.data.websiteLink);
        }
        setIsDeployed(checkDeploy.data.status);
        setLoadingDeploy(false);
      } catch (error) {
        console.error("Error fetching shared code:", error);
      } finally {
        setLoadingDeploy(false);
      }
    };
    checkDeployed();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedLink);
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("Copy Link");
    }, 1000);
  };

  return (
    <motion.div
      className="fixed z-50 inset-0 bg-black bg-opacity-90 flex items-center justify-center"
      // onClick={onClose}
    >
      {loadingDeploy ? (
        <div className="inset-0 bg-[#0f0f0f]   items-center justify-center h-72 border-[1.5px] border-[#272728] rounded-[10px] md:w-[46%] w-[94%] gap-4  text-sm md:p-6 p-6 md:py-6   flex flex-col">
            <Loader w={35} h={35} />
        </div>
      ) : (
        <div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Starts small & slightly above
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }} // Expands normally
          exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }} // Shrinks back to top-right
          transition={{ duration: 0, ease: "easeOut" }}
          className="inset-0 bg-[#0f0f0f]  border-[1.5px] border-[#272728] rounded-[10px] md:w-[46%] w-[94%] gap-4  text-sm md:p-6 p-6 md:py-6   flex flex-col"
        >
          <div className=" flex flex-col gap-2">
            {" "}
            <div className="text-white text-xl">
              {isDeployed ? "Your website is Deployed" : "Deploy this Website?"}
            </div>
            {!isDeployed && (
              <div className="text-white text-opacity-70 md:w-[85%] w-full">
                Deploying this website will make it live and accessible to
                anyone with the link.
              </div>
            )}{" "}
          </div>

          {isDeployed ? (
            <div>
              <div className=" flex flex-col gap-2">
                <div className="text-white text-opacity-70 md:w-[85%] w-full">
                  Your website is live at the following link:
                </div>
                <div className=" flex gap-[6px] items-center border text-white myborder p-2 px-4 rounded-md text-xs md:text-sm">
                  <img src="/link.png" className=" w-5 h-5" /> {url}
                </div>

           {  imageLoading?<div className=" h-64 w-full  rounded-md bg-white bg-opacity-10 animate-pulse"> 
            </div>:  <div className="relative rounded-md">
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt="Website Snapshot"
                    className="w-full h-64 rounded-md object-cover object-top"
                  />

                  {/* Gradient Overlay */}
                  <a href={url} target="blank" className="absolute  cursor-pointer inset-0 bg-gradient-to-b from-black via-transparent  to-black opacity-20 rounded-md"></a>
                </div>}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-2">
              <div className="text-white text-opacity-70 md:w-[85%] w-full">
                Your website will be live at the following link:
              </div>
              <div className=" flex gap-[2px] items-center border myborder p-2 px-4 rounded-md  text-xs md:text-sm ">
                <div className="text-white text-opacity-70">ogata-</div>
                <input
                  value={websiteName}
                  disabled={Loading}
                  onChange={(e) =>
                    setWebsiteName(
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-") // Replace spaces with "-"
                        .replace(/[^a-z0-9-]/g, "")
                    )
                  }
                  className=" bg-white bg-opacity-5 text-white p-2 rounded-md outline-none w-[100px] md:w-fit"
                />
                <div className="text-white text-opacity-70">
                  {"-" + randString}.surge.sh
                </div>
              </div>
            </div>
          )}
          <div className=" ">
            <div className=" flex items-center justify-end gap-2">
              {!isDeployed ? (
                <button
                  disabled={websiteName.length === 0||Loading}
                  onClick={handleDeploy}
                  className={`text-black 
               ${
                 websiteName.length === 0
                   ? "cursor-not-allowed bg-opacity-50 "
                   : "cursor-pointer"
               }  transition-all rounded-md py-2 px-4 flex items-center justify-start gap-2  bg-white  "
            `}
                >
                  {Loading ? (<div className=" flex items-center justify-center gap-1"> <Loader w={20} h={20}/> Deploying...</div>  ): (
                    "Deploy"
                  )}
                </button>
              ) : (
                <a href={url} target="blank" className=" text-black transition-all rounded-md py-2 px-4 flex items-center justify-start gap-2  bg-white">
                  <img src="/open.png" className=" w-4 h-4" /> Open
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Deploy;
