import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loader from "./loading";

const NUM_ROWS = 7; // Days of the week (Sun-Sat)
const NUM_COLS = 53; // Weeks in a year

// Function to generate contribution grid with fixed size
const getFixedGrid = () => {
  let today = dayjs();
  let grid = Array(NUM_COLS)
    .fill(null)
    .map(() => Array(NUM_ROWS).fill(null));

  let currentDate = today;
  for (let col = NUM_COLS - 1; col >= 0; col--) {
    for (let row = NUM_ROWS - 1; row >= 0; row--) {
      grid[col][row] = {
        date: currentDate.format("YYYY-MM-DD"),
        day: currentDate.date(),
        level: Math.floor(Math.random() * 6), // Random activity level (0-5)
      };
      currentDate = currentDate.subtract(1, "day");
    }
  }
  return grid;
};
const contributionsGrid = getFixedGrid();
const colorMap = {
  0: "bg-[#FFFFFF0D]", // 5%
  1: "bg-[#FFFFFF19]", // 10%
  2: "bg-[#FFFFFF26]", // 15%
  3: "bg-[#FFFFFF33]", // 20%
  4: "bg-[#FFFFFF40]", // 25%
  5: "bg-[#FFFFFF4D]", // 30%
  6: "bg-[#FFFFFF59]", // 35%
  7: "bg-[#FFFFFF66]", // 40%
  8: "bg-[#FFFFFF73]", // 45%
  9: "bg-[#FFFFFF80]", // 50%
  10: "bg-[#FFFFFF8C]", // 55%
  11: "bg-[#FFFFFF99]", // 60%
  12: "bg-[#FFFFFFA6]", // 65%
  13: "bg-[#FFFFFFB3]", // 70%
  14: "bg-[#FFFFFFCC]", // 80%
  15: "bg-[#FFFFFFFF]", // 100%
};

function SettingModal({ onClose }) {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  const profileUrl = decodedToken && decodedToken.avatar;
  const name = decodedToken && decodedToken.name;
  const [contributions, setContributions] = useState([]);

  // Auto-scroll to the latest date (last column)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  const handleMouseEnter = (event, date) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    // convering date from YYYY-MM-DD this to date- month name in words in 3 letters -year
    const dateObj = dayjs(date);
    date = dateObj.format("DD MMM YYYY");
    setHoveredDate(date);
  };
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chats/contributions/${email}`
        );
        setContributions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);
  const messageCount =
    contributions
      ?.flat() // Flatten the 2D array into a 1D array
      ?.find(
        (contribution) =>
          contribution.date === dayjs(hoveredDate).format("YYYY-MM-DD")
      )?.messageCount || 0;

  return (
    <motion.div className="flex items-center justify-center h-screen w-screen bg-opacity-90 bg-black z-[51] absolute">
      {false ? (
        <div className="inset-0 bg-[#0f0f0f]   items-center justify-center border-[1.5px] border-[#272728] rounded-[10px] h-[85%] w-[95%] md:w-[80%]  gap-4  text-sm md:p-6 p-6 md:py-6   flex flex-col">
          <Loader w={35} h={35} />
        </div>
      ) : (
        <div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.8, y: -10, x: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10, x: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inset-0 bg-[#0f0f0f] border-[1.5px] border-[#272728] rounded-[10px] h-[85%] w-[95%] md:w-[80%] gap-4 text-sm md:p-6 p-6 md:py-6 flex flex-col"
        >
          <div className="flex items-center gap-2 pb-2">
            <img src="/setting.png" className="w-6 h-6" alt="Settings" />{" "}
            Settings
          </div>

          {/* Tabs */}
          <div className="px-2 border-b-[1px] flex gap-3 text-xs border-white border-opacity-10">
            <div className="border-b-[2px] pb-2 cursor-pointer border-white text-xs">
              General
            </div>
            <div className="text-white text-opacity-70 cursor-pointer">
              API Keys
            </div>
          </div>
          <div className=" overflow-scroll no-scrollbar">
            {/* Tooltip */}
            {hoveredDate && (
              <motion.div
                className="absolute px-3 py-2 bg-white   text-xs text-black font-semibold border-[1px] border-white border-opacity-10 rounded-md"
                style={{
                  top: tooltipPos.y - 40,
                  left: tooltipPos.x - 30,
                  position: "absolute",
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {messageCount} messages on {hoveredDate}
              </motion.div>
            )}

            {/* Contribution Grid */}
            <div className="flex flex-col gap-5 justify-center items-center w-full">
              <div className="flex md:w-[80%] w-[95%] flex-col gap-4 text-white">
                <div>Your Activity</div>

            { loading?<div className="h-[120px] p-2 md:w-[809px] overflow-scroll no-scrollbar border border-[#272728] rounded-lg animate-pulse bg-white bg-opacity-5">

            </div>:   <div
                  ref={containerRef}
                  className="h-[120px] p-2 md:w-[809px] overflow-scroll no-scrollbar border border-[#272728] rounded-lg bg-[#0f0f0f]"
                >
                  <div className="flex gap-[3px]">
                    {contributions.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {week.map((contribution, dayIndex) => (
                          <motion.div
                            key={dayIndex}
                            className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${
                              colorMap[contribution?.level]
                            }`}
                            onMouseEnter={(event) =>
                              handleMouseEnter(event, contribution?.date)
                            }
                            onMouseLeave={() => setHoveredDate(null)}
                            transition={{ duration: 0.15 }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>}
              </div>
              <div className="flex md:w-[80%] w-[95%]  flex-col gap-4 text-white">
                <div className="">User Settings</div>
                <div className="  flex justify-between py-1">
                  <div className="flex flex-col  justify-center ">
                    <div className="text-white text-xs md:text-sm">
                      Profile Picture
                    </div>
                    <div className=" text-xs md:text-sm">
                      {" "}
                      This profile picture is associated with your Email
                    </div>
                  </div>
                  <img
                    src={profileUrl}
                    className="w-12 h-12 rounded-full border-[1px] myborder"
                  />
                </div>
                <div className=" border-b-[1px] w-full border-white border-opacity-10"></div>

                <div className="  flex justify-between py-1">
                  <div className="flex flex-col  justify-center ">
                    <div className="text-white text-xs md:text-sm">
                      Username
                    </div>
                    <div className=" text-xs md:text-sm">
                      This cannot be changed.{" "}
                    </div>
                  </div>
                  <div className=" rounded-md px-6 bg-white bg-opacity-5  flex items-center justify-center myborder text-xs">
                    {" "}
                    {email.split("@")[0]}
                  </div>
                </div>
                <div className=" border-b-[1px] w-full border-white border-opacity-10"></div>
                <div className="  flex justify-between py-1">
                  <div className="flex flex-col  justify-center ">
                    <div className="text-white text-xs md:text-sm ">
                      Your Name
                    </div>
                    <div className=" text-xs md:text-sm">
                      This cannot be changed.{" "}
                    </div>
                  </div>
                  <div className=" rounded-md px-6 bg-white bg-opacity-5 flex items-center justify-center myborder text-xs">
                    {" "}
                    {name.split("@")[0]}
                  </div>
                </div>
                <div className=" border-b-[1px] w-full border-white border-opacity-10"></div>
                <div className="  flex md:flex-row flex-col justify-between py-1 gap-3">
                  <div className="flex flex-col  justify-center ">
                    <div className="text-white text-xs md:text-sm ">
                      Your Linked Accounts
                    </div>
                    <div className=" text-xs md:text-sm">
                      This is your auth account.{" "}
                    </div>
                  </div>
                  <div className=" rounded-md px-6 bg-white bg-opacity-5 flex items-center justify-center py-2 gap-2 myborder text-xs">
                    <img className=" w-4 h-4" src="/google-icon.png" /> {email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SettingModal;
