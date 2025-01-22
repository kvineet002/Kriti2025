import React from 'react';
import { motion } from 'framer-motion';

const HeroComponent = () => {
  return (
    <div
      className="w-full top-0 flex flex-col items-center justify-center inset-0 
      bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.5)),linear-gradient(to_right,#1c1c1c_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c_1px,transparent_1px)] 
      bg-[size:60px_60px] -mt-24 pt-48"
    >
      <div className="flex flex-col gap-5 items-center justify-center mb-10">
        <div className="w-[30%] h-8 border bg-black bg-opacity-60 border-[#2A2A2A] rounded-2xl"></div>
        <motion.h1
          className="text-4xl lg:text-6xl text-wrap font-bold text-center w-[70%]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Revolutionizing the Future of Data Tracking
        </motion.h1>
        <p className="w-1/2 text-center font-thin text-base">
          Discover what drives results and what doesn’t to boost your search traffic.
        </p>
        <div className="h-32 border border-[#414141] w-[80%] lg:w-[40%] rounded-xl bg-[#0F0F0F] mt-6 pointer-events-auto">
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
