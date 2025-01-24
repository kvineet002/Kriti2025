import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Tiles = () => {
  const TILE_COUNT = 220; 
  const COLUMNS = 22;
  const [glowing, setGlowing] = useState(Array(TILE_COUNT).fill(0));

  const updateGlowing = () => {
    setGlowing((prev) => {
      const newGlowing = [...prev];
      const randomIndex = Math.floor(Math.random() * TILE_COUNT);
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
    const interval = setInterval(updateGlowing, 500);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-[1500px] h-full absolute -z-50 overflow-hidden">
      <div
        className={`grid grid-cols-${COLUMNS} gap-0`}
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: TILE_COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className={`aspect-square border border-white border-opacity-10 transition-smooth duration-1000 ${
              glowing[index] ? "bg-white bg-opacity-20" : "bg-transparent"
            }`}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

const HeroComponent = () => {
  return (
    <div className="w-full h-full top-0 flex flex-col items-center justify-center overflow-x-hidden bg-[#383838] bg-gradient-radial from-[#383838] via-[#000000] to-black bg-opacity-10">
      <Tiles />
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
              className="w-full p-4 bg-transparent text-opacity-50 outline-none"
              placeholder="Ask something...."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
