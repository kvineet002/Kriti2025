import { useState } from 'react';
import layout1 from './layout1.png';
import layout2 from './layout2.png';
import layout3 from './layout3.png';
import layout4 from './layout4.png';
import layout5 from './layout5.png';
import layout6 from './layout6.png';
import layout7 from './layout7.png';
import layout8 from './layout8.png';

const colorPalette = [
    {
        name: "Cool Greens",
        colors: ['bg-[#B5FFE1]', 'bg-[#93E5AB]', 'bg-[#65B891]', 'bg-[#4E878C]', 'bg-[#00241B]']
    },
    {
        name: "Elegant Purples",
        colors: ['bg-[#C4BBB8]', 'bg-[#F5B0CB]', 'bg-[#DC6ACF]', 'bg-[#745C97]', 'bg-[#39375B]']
    },
    {
        name: "Sophisticated Tones",
        colors: ['bg-[#223127]', 'bg-[#900D38]', 'bg-[#CE5374]', 'bg-[#DBBBF5]', 'bg-[#DDF0FF]']
    },
    {
        name: "Soft Neutrals",
        colors: ['bg-[#FEFFFE]', 'bg-[#E9EBF8]', 'bg-[#B4B8C5]', 'bg-[#A5A299]', 'bg-[#8D818C]']
    },
    {
        name: "Earthy Contrast",
        colors: ['bg-[#07020D]', 'bg-[#5DB7DE]', 'bg-[#F1E9DB]', 'bg-[#A39B8B]', 'bg-[#716A5C]']
    },
    {
        name: "Pastel Harmony",
        colors: ['bg-[#79ADDC]', 'bg-[#FFC09F]', 'bg-[#FFEE93]', 'bg-[#FCF5C7]', 'bg-[#ADF7B6]']
    },
    {
        name: "Golden Earth",
        colors: ['bg-[#D5B942]', 'bg-[#D9D375]', 'bg-[#E3DE8F]', 'bg-[#EDFBC1]', 'bg-[#BFCBC2]']
    },
    {
        name: "Vibrant Fusion",
        colors: ['bg-[#D68FD6]', 'bg-[#DEFFF2]', 'bg-[#464F51]', 'bg-[#000009]', 'bg-[#0FF4C6]']
    },
    {
        name: "Bold Contrast",
        colors: ['bg-[#373F51]', 'bg-[#008DD5]', 'bg-[#DFBBB1]', 'bg-[#F56476]', 'bg-[#E43F6F]']
    },
    {
        name: "Warm Elegance",
        colors: ['bg-[#8B1E3F]', 'bg-[#3C153B]', 'bg-[#89BD9E]', 'bg-[#F0C987]', 'bg-[#DB4C40]']
    },
    {
        name: "Nature's Essence",
        colors: ['bg-[#065143]', 'bg-[#129490]', 'bg-[#70B77E]', 'bg-[#E0A890]', 'bg-[#CE1483]']
    },
    {
        name: "Warm Tones",
        colors: ['bg-[#FFB997]', 'bg-[#F67E7D]', 'bg-[#843B62]', 'bg-[#0B032D]', 'bg-[#74546A]']
    },
    {
        name: "Cool Serenity",
        colors: ['bg-[#4BC6B9]', 'bg-[#73C1C6]', 'bg-[#96C3CE]', 'bg-[#A79AB2]', 'bg-[#B57BA6]']
    },
    {
        name: "Mystic Sunset",
        colors: ['bg-[#7F7EFF]', 'bg-[#A390E4]', 'bg-[#C69DD2]', 'bg-[#CC8B8C]', 'bg-[#C68866]']
    },
    {
        name: "Muted Elegance",
        colors: ['bg-[#FAC8CD]', 'bg-[#D7BCC8]', 'bg-[#98B6B1]', 'bg-[#629677]', 'bg-[#495D63]']
    },
    {
        name: "Earthy Pastels",
        colors: ['bg-[#C1B098]', 'bg-[#E9D2F4]', 'bg-[#9B9B93]', 'bg-[#39393A]', 'bg-[#63B0CD]']
    },
    {
        name: "Deep Warmth",
        colors: ['bg-[#3A2E39]', 'bg-[#1E555C]', 'bg-[#F4D8CD]', 'bg-[#EDB183]', 'bg-[#F15152]']
    }
];

const layouts = [
    {
        name: "Layout 1",
        img: layout1
    },
    {
        name: "Layout 2",
        img: layout2
    },
    {
        name: "Layout 3",
        img: layout3
    },
    {
        name: "Layout 4",
        img: layout4
    },
    {
        name: "Layout 5",
        img: layout5
    },
    {
        name: "Layout 6",
        img: layout6
    },
    {
        name: "Layout 7",
        img: layout7
    },
    {
        name: "Layout 8",
        img: layout8
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
        <div className="myborder bg-[#141415] text-opacity-80 text-white rounded-lg w-[95%] h-full md:h-[70%] flex flex-col md:flex-row items-center justify-center">
            {/* Color Palettes Section */}
            <div className='w-full md:w-[45%] h-[40%] md:h-full p-6 md:p-10 flex flex-col'>
                <h1 className="text-base md:text-lg font-bold pb-6">Choose Color Palettes</h1>
                <div className='flex flex-col overflow-y-auto no-scrollbar gap-2 w-full flex-1'>
                    {colorPalette.map((palette, index) => (
                    <div className=' flex flex-col gap-2'>   <div
                            key={index}
                            className={`flex flex-col gap-2  border-opacity-20 border-white py-5 hover:bg-white hover:bg-opacity-5 hover:rounded-lg cursor-pointer pl-4 transition-all duration-150 ${
                                selectedPalette?.name === palette.name ? 'bg-white bg-opacity-5 rounded-lg myborder' : ''
                            }`}
                            onClick={() => handlePaletteSelection(palette)}
                        >
                            <div className='text-sm md:text-sm font-light'>{palette.name}</div>
                            <div className='overflow-x-auto no-scrollbar'>
                                <div className='flex gap-4 w-max'>
                                    {palette.colors.map((color, ind) => (
                                        <div key={ind} className={`${color} h-6 w-10 flex-shrink-0`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className=' w-full h-[1px] border-dashed border-opacity-20 border-white border-b'></div>
                            </div>
                    ))}
                </div>
            </div>

            {/* Choose Layout Section */}
            <div className='w-full md:w-[55%] h-[60%] md:h-full md:border-l-[2px] p-6 border-t-[2px] md:border-t-0 border-dashed border-opacity-10 border-white md:p-10 flex flex-col'>
                <h1 className="text-base md:text-lg font-bold pb-6">Choose Layout</h1>
                <div className='flex overflow-x-auto no-scrollbar gap-4 flex-1 p-4'>
                    {layouts.map((layout, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 flex flex-col w-44 md:w-64 gap-2 p-4 cursor-pointer transition-opacity hover:bg-white hover:bg-opacity-5 hover:rounded-lg duration-300 ${
                                selectedLayout?.name === layout.name ? 'bg-white bg-opacity-5 rounded-lg myborder' : ''
                            }`}
                            onClick={() => handleLayoutSelection(layout)}
                        >
                            <div className='text-sm md:text-base p-2'>{layout.name}</div>
                            <div className='h-40 bg-gray-700 flex items-center justify-center overflow-y-scroll no-scrollbar flex-1'>
                                <img src={layout.img} alt={layout.name} className="w-full mt-auto" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex ml-auto justify-between items-center gap-4  p-1 font-medium px'>
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
                        className={`cursor-pointer bg-white text-black p-1 font-medium px-3 rounded-md transition-all duration-150 ${
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