import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    const rand2 = Math.floor(Math.random() * (secondRowEnd - secondRowStart)) + secondRowStart; 
    const rand3 = Math.floor(Math.random() * (tilesCount - thirdRowStart)) + thirdRowStart;
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
  return (
    <div className="w-full h-full top-0 flex flex-col bg-cover items-center justify-center gradient-overlay overflow-hidden relative">
      <Tiles />
      <div className="flex flex-col gap-5 items-center justify-center mb-10 poppins pt-36">
        <div className="w-[30%] h-8 border bg-black bg-opacity-60 border-[#2A2A2A] rounded-2xl"></div>
        <motion.h1
          className="text-4xl lg:text-6xl text-white text-wrap font-bold text-center w-[70%]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Prompt. Generate. Launch. Instant websites.
        </motion.h1>
        <p className="w-1/2 text-center text-white font-thin text-base">
          Design, layout, and functionality—all generated from your prompt.
        </p>
        <div className="h-32 border text-white border-[#414141] w-[80%] lg:w-[40%] rounded-xl bg-[#0F0F0F] mt-6 pointer-events-auto">
          <div className="p-2">
            <input
              type="text"
              className="w-full p-4 bg-transparent opacity-50 outline-none"
              placeholder="Ask engine a question...."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
