import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion';

const Tiles = () => {
  const [columns, setColumns] = useState(0);
  const [tilesCount, setTilesCount] = useState(0);
  const [glowing, setGlowing] = useState([15, 19, 24]);

  const createGrid = () => {
    const tileSize = 70;
    const cols = Math.floor(window.innerWidth / tileSize);
    const rows = 8;

    setColumns(cols);
    setTilesCount(cols * rows);
  };

  const updateGlowing = () => {
    const firstRowEnd = columns * 2;
    const secondRowStart = firstRowEnd;
    const secondRowEnd = columns * 4;
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
    <div className="w-full bottom-0 absolute -z-50 overflow-hidden">
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

const Footer = () => {
  
  return (
    <div className=' flex flex-col text-white text-center relative bottom-0 overlay-gradient overflow-hidden h-[400px]'>
      <div className='text-2xl font-bold'>Footer</div>
      <div className='text-sm'>This is the footer</div>
      <div className='bottom-0 absolute w-full overflow-hidden '>
        <img src="footer.svg" alt="footer" className='w-full scale-150 md:scale-100'/>
      </div>
      <Tiles />
    </div>
  )
}

export default Footer