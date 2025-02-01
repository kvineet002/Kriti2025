import { useState } from 'react';

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

const layouts = [
    {
        name: "Layout 1",
        img: "/layout1.png"
    },
    {
        name: "Layout 2",
        img: "/layout2.png"
    },
    {
        name: "Layout 3",
        img: "/layout3.png"
    },
    {
        name: "Layout 4",
        img: "/layout4.png"
    },
    {
        name: "Layout 5",
        img: "/layout5.png"
    },
    {
        name: "Layout 6",
        img: "/layout6.png"
    },
];

const Layout = ({ setSelectLayout, setSelectedColorPalette, setSelectedTheme }) => {
    const [selectedPalette, setSelectedPalette] = useState(null);
    const [selectedLayout, setSelectedLayout] = useState(null);

    const handlePaletteSelection = (palette) => {
        setSelectedPalette(palette);
        setSelectedColorPalette(palette);
    };

    const handleLayoutSelection = (layout) => {
        setSelectedLayout(layout);
        setSelectedTheme(layout); // Assuming setSelectedTheme is used for layout selection
    };

    return (
        <div className="myborder bg-[#141415] text-white rounded-xl w-[95%] h-full md:h-[70%] flex flex-col md:flex-row items-center justify-center">
            {/* Color Palettes Section */}
            <div className='w-full md:w-[45%] h-[40%] md:h-full p-6 md:p-10 flex flex-col'>
                <h1 className="text-base md:text-lg font-bold pb-6">Choose Color Palettes</h1>
                <div className='flex flex-col overflow-y-auto no-scrollbar gap-4 w-full flex-1 md:mb-8'>
                    {colorPalette.map((palette, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-4 border-dashed border-opacity-20 border-white border-b-[1px] pb-4 md:pb-6 cursor-pointer pl-4 transition-all duration-150 ${
                                selectedPalette?.name === palette.name ? 'bg-white bg-opacity-5 rounded-lg' : ''
                            }`}
                            onClick={() => handlePaletteSelection(palette)}
                        >
                            <div className='text-sm md:text-base'>{palette.name}</div>
                            <div className='overflow-x-auto no-scrollbar'>
                                <div className='flex gap-4 w-max'>
                                    {palette.colors.map((color, ind) => (
                                        <div key={ind} className={`${color} h-8 w-12 flex-shrink-0`} />
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
                <div className='flex overflow-x-auto no-scrollbar gap-4 flex-1 p-4'>
                    {layouts.map((layout, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 flex flex-col w-44 md:w-64 gap-2 p-4 cursor-pointer transition-all duration-300 ${
                                selectedLayout?.name === layout.name ? 'bg-white bg-opacity-5 rounded-lg' : ''
                            }`}
                            onClick={() => handleLayoutSelection(layout)}
                        >
                            <div className='text-sm md:text-base p-2'>{layout.name}</div>
                            <div className='h-40 bg-gray-700 flex items-center justify-center overflow-auto no-scrollbar flex-1'>
                                <img src={layout.img} alt={layout.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex ml-auto justify-between items-center gap-4 pt-4'>
                    <div
                        onClick={() => {
                            setSelectedColorPalette(null);
                            setSelectedTheme(null);
                            setSelectLayout(false);
                        }}
                        className='cursor-pointer transition-all duration-150 hover:opacity-70'
                    >
                        Cancel
                    </div>
                    <div
                        className={`cursor-pointer bg-white text-black p-2 rounded-md transition-all duration-150 ${
                            !selectedPalette && !selectedLayout ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'
                        }`}
                        onClick={() => {
                            if (selectedPalette || selectedLayout) {
                                setSelectLayout(false);
                            }
                        }}
                    >
                        Proceed
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;