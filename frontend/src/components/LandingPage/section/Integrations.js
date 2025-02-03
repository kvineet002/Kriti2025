import React from "react";
import Heading from "../subcomp/Heading";
import Name from "../subcomp/Name";
import Desc from "../subcomp/Desc";

const tools = [
  {
    name: "Gemini",
    src: "/gemini.svg",
    text: "Generates website content based on user prompts, making site creation effortless.",
  },
  {
    name: "PixaBay",
    src: "/pixabay.png",
    text: "Provides high-quality stock images to enhance the visual appeal of generated websites.",
  },
  {
    name: "Supabase",
    src: "supabase.svg",
    text: "Stores and manages website metadata, ensuring seamless access and organization.",
  },
];



const Integrations = () => {
  return (
    <div className=" bg-black flex px-5 md:px-24 flex-col text-white">
      <Name name={"Integrations"} />
      <div
        className="flex flex-col lg:-mt-48 gap-2 
      sm:-mt-12 overflow-hidden"
      >
        <Heading heading={"Integrations"} img={"/integrations.svg"} />
        <Desc
          tag1={"Connect Effortlessly"}
          tag2={
            "Our AI solutions are designed to integrate smoothly with your current technology stack."
          }
        />

        <div className=" overflow-hidden  py-12 md:py-0 md:pt-7">
          <img
            src="wire-component.svg"
            className="w-[75%] mx-auto md:p-0 scale-[2.9] md:scale-100 "
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-around items-center gap-4 lg:gap-3 z-10 w-full">
          {tools.map((item, index) => (
            <div
              className="border myborder p-3 lg:h-60 rounded-xl "
              key={index}
            >
              <div className="border border-[#222222] h-full rounded-lg bg-gradient-to-br from-[#181818] via-[#080808] to-[#181818] flex flex-col justify-around items-start gap-3 py-3">
                <div className="flex justify-between px-6 w-full items-center gap-4">
                  <img src={item.src} className="h-12 w-12 p-2 rounded-lg myborder bg-black"/>
                </div>
                <div className="px-6 text-white md:text-lg font-bold">
                  {item.name}
                </div>
                <div className="px-6 text-white text-sm md:text-base font-thin">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
