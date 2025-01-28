import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { promptList } from "../../../constants/promptList";
import LoginModal from "../LoginModal";

const Tiles = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [tilesCount, setTilesCount] = useState(0);
  const [glowing, setGlowing] = useState([15, 19, 24]);

  const createGrid = () => {
    const tileSize = 70;
    const cols = Math.floor(window.innerWidth / tileSize);
    const rows = Math.floor(window.innerHeight / tileSize);

    setColumns(cols);
    setRows(rows);
    setTilesCount(cols * rows);
  };

  const updateGlowing = () => {
    const firstRowEnd = columns * 3;
    const secondRowStart = firstRowEnd;
    const secondRowEnd = columns * 6;
    const thirdRowStart = secondRowEnd;

    const rand1 = Math.floor(Math.random() * firstRowEnd);
    const rand2 =
      Math.floor(Math.random() * (secondRowEnd - secondRowStart)) +
      secondRowStart;
    const rand3 =
      Math.floor(Math.random() * (tilesCount - thirdRowStart)) + thirdRowStart;
    setGlowing([rand1, rand2, rand3]);
  };

  useEffect(() => {
    createGrid();
    window.addEventListener("resize", createGrid);

    return () => window.removeEventListener("resize", createGrid);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateGlowing, 1500);
    return () => clearInterval(interval);
  }, [tilesCount]);

  return (
    <div className="w-full top-0 absolute -z-50 overflow-hidden">
      <div
        className={`grid gap-0`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: tilesCount }).map((_, index) => (
          <motion.div
            key={index}
            className="aspect-square border border-white border-opacity-20"
            animate={{
              backgroundColor: glowing.includes(index)
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0)",
              opacity: glowing.includes(index) ? 1 : 0.5,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

const HeroComponent = () => {
  const [initialQuestion, setInitialQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  function generatePrompt() {
    const singlePrompt =
      promptList[Math.floor(Math.random() * promptList.length)];
    setIsLoading(true);
  
    // Clear the existing question
    setInitialQuestion("");
  
    // Display the prompt letter by letter
    let index = -1;
    const typingInterval = setInterval(() => {
      if (index <singlePrompt.length-1) {
        setInitialQuestion((prev) => prev + singlePrompt[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsLoading(false); // Stop loading once the typing is complete
      }
    }, 15); // Adjust the interval speed as needed (100ms for each letter)
  }
  
  const handleSend = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  return (
    <div className="w-full h-full top-0 flex flex-col bg-cover items-center justify-center gradient-overlay overflow-hidden relative">
      <Tiles />
      <img
        src="/Line.png"
        alt="Line"
        className="w-[2px] translate-x-[144px] hidden md:flex translate-y-36 absolute inset-0 "
      />
      <img
        src="/Line.png"
        alt="Line"
        className="w-[1px] -translate-x-[181px] hidden md:flex translate-y-6 absolute top-0 "
      />
      <img
        src="/Line.png"
        alt="Line"
        className="w-[2px] -translate-x-[218px] right-0 top-0 hidden md:flex translate-y-16 absolute   "
      />
      <div className="flex flex-col gap-5 items-center justify-center mb-10 poppins pt-36 ">
        <h1 className="text-3xl lg:text-6xl text-white text-wrap font-bold text-center  md:w-[70%] w-[95%]">
          Prompt. Generate. Launch. Instant websites.
        </h1>
        <p className="text-center text-white font-extralight md:font-thin md:text-base  text-sm md:w-[50%] w-[80%]">
          Design, layout, and functionality—all generated from your prompt.
        </p>
        {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
        />
      )}
     
        <form
      onSubmit={
        initialQuestion.length === 0
          ? (e) => e.preventDefault()
          : handleSend
      }
      className="h-32 border flex flex-col items-end text-white myborder p-2 px-4 w-[90%] md:w-[50%] rounded-xl bg-[#0F0F0F] mt-6 pointer-events-auto"
    >
      <input
        type="text"
        value={initialQuestion}
        onChange={(e) => setInitialQuestion(e.target.value)}
        className="w-full p-4 px-0 bg-transparent opacity-50 outline-none"
        placeholder="Ask engine a question...."
      />
      <div className="flex items-center justify-center gap-2">
        <div
          onClick={!isLoading ? generatePrompt : null}
          className={`select-none border-2 myborder rounded-xl p-[7px] px-4 ${
            isLoading ? "border-animated" : "hover:bg-opacity-5"
          } cursor-pointer font-light items-center justify-center myborder border-dashed text-sm flex gap-2 bg-white bg-opacity-10`}
        >
          <img src="/sparkle.svg" alt="Sparkle" />
          Generate a Prompt
        </div>
        <div
          onClick={initialQuestion.length === 0 ? null : handleSend}
          className={`text-black bg-white p-[7px] px-4 rounded-md ${
            initialQuestion.length === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          Send
        </div>
      </div>
    </form>
      </div>
    </div>
  );
};

export default HeroComponent;
