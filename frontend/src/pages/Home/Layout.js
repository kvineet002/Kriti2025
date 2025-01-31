import React from 'react';

const colorPalette = [
    {
        name: "Vibrant Colors",
        colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
    },
    {
        name: "Pastel Colors",
        colors: ['bg-pink-500', 'bg-gray-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500']
    },
    {
        name: "Warm Colors",
        colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
    },
    {
        name: "Cool Colors",
        colors: ['bg-pink-500', 'bg-gray-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500']
    },
    {
        name: "Bold Colors",
        colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
    },
    {
        name: "Muted Colors",
        colors: ['bg-pink-500', 'bg-gray-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500']
    }
];

const Layout = () => {
  return (
    <div className="myborder bg-black text-white rounded-xl w-[80%] h-[95%] md:h-[70%] flex flex-col md:flex-row items-center justify-center">
      {/* Color Palettes Section */}
      <div className='w-full md:w-[45%] h-[40%] md:h-full p-6 md:p-10 flex flex-col'>
        <h1 className="text-base md:text-lg font-bold pb-6">Choose Color Palettes</h1>
        <div className='flex flex-col overflow-y-auto no-scrollbar gap-4 w-full flex-1 md:mb-8'>
          {colorPalette.map((palette, index) => (
            <div key={index} className='flex flex-col gap-4 border-dashed border-opacity-20 border-white border-b-[1px] pb-4 md:pb-6'>
              <div className='text-sm md:text-base'>{palette.name}</div>
              <div className='overflow-x-auto no-scrollbar'>
                <div className='flex gap-4 md:gap-6 w-max'>
                  {palette.colors.map((color, ind) => (
                    <div key={ind} className={`${color} h-8 w-12 flex-shrink-0`}/>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Choose Layout Section */}
      <div className='w-full md:w-[55%] h-[60%] md:h-full md:border-l-[2px] p-6 border-t-[2px] md:border-t-0 border-dashed border-opacity-20 border-white md:p-10 flex flex-col'>
        <h1 className="text-base md:text-lg font-bold pb-6">Choose Layout</h1>
        <div className='flex flex-col overflow-auto no-scrollbar border-2 flex-1'>
          {/* Layout options go here */}
        </div>
        <div className='flex ml-auto justify-between gap-4 pt-4'>
          <div className='cursor-pointer'>Cancel</div>
          <div className='cursor-pointer'>Proceed</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;