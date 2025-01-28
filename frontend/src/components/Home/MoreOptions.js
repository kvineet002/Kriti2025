import React from "react";

function MoreOptions({ onClose }) {
  return (
    <div
      className=" fixed flex flex-col   myborder w-fit  text-sm gap-2 p-5 py-5 bg-gray-600  md:top-10 top-16 right-12 md:right-12 transition-all ease-in-out rounded-md z-[100]"
      onClick={onClose}
    >
      <div className=" bg-white bg-opacity-20 rounded-md py-1 px-2 ">Share</div>
      <div className=" bg-white bg-opacity-20 rounded-md py-1 px-2 ">Add to Favourites</div>
      <div className=" bg-white bg-opacity-20 rounded-md py-1 px-2 ">Share</div>
    </div>
  );
}

export default MoreOptions;
