import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Tiles = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [tilesCount, setTilesCount] = useState(rows*columns);
  const [glowing, setGlowing] = useState(Array(tilesCount).fill(0));

  const createGrid = () => {
    const tileSize = 70; 
    const cols = Math.floor(window.innerWidth / tileSize);
    const rows = Math.floor(window.innerHeight / tileSize);

    setColumns(cols);
    setRows(rows);
    setTilesCount(rows * cols);
  };
  
  const updateGlowing = () => {
    setGlowing((prev) => {
      const newGlowing = [...prev];
      const randomIndex = Math.floor(Math.random() * tilesCount);
      newGlowing[randomIndex] = 1;
      setTimeout(() => {
        setGlowing((prev) => {
          const updatedGlowing = [...prev];
          updatedGlowing[randomIndex] = 0;
          return updatedGlowing;
        });
      }, 500);

      return newGlowing;
    });
  };

  useEffect(() => {
    createGrid();
    window.addEventListener("resize", createGrid);

    return () => window.removeEventListener("resize", createGrid);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateGlowing, 500);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className="w-full h-full grid absolute -z-50 top-0"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: tilesCount }).map((_, index) => (
        <div
          key={index}
          className={`border border-white border-opacity-10 transition-smooth duration-1000 ${glowing[index] ? "bg-white bg-opacity-20" : "bg-transparent"}`}
          />
      ))}
    </div>
  );
};

const HeroComponent = () => {
  return (
    <div className="w-full h-full gradient-overlay flex flex-col items-center justify-center overflow-x-hidden pt-44 pb-32">
      <Tiles />
      <img src="Line.svg" className="absolute hidden top-[] w-[1.5px] left-[144px]"/>
      <img src="Line.svg" className="absolute"/>
      <img src="Line.svg" className="absolute"/>
      <div className="flex flex-col gap-5 items-center justify-center mb-10 poppins">
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
