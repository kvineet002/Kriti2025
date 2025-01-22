import React from 'react'

const WireComponent = () => {

  return (
    <div className=' bg-black flex flex-col'>
        <div className='text-center text-7xl lg:text-[150px] bg-gradient-to-b from-[#292828] to-black text-transparent bg-clip-text 
          font-extrabold '>
            INTEGRATIONS
        </div>
        <div className='flex flex-col mx-auto lg:-mt-28 gap-2 w-[80%] lg:w-[full]
     '>
            <div className='bg-[black] bg-opacity-50 text-white border border-1 border-[#444444] rounded-[48px] p-1 flex ml-2 w-48 gap-4 items-center '>
                <div className='w-10 h-10 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-full '/>
                <div className='text-lg font-bold'> Integrations</div>
            </div>
            <div className='flex flex-wrap justify-between'>
                <div className='text-4xl p-4'>
                    Connect Effortlessly
                </div>
                <div className='text-sm text-wrap  md:w-[30rem] p-4 '>
                    Our AI solutions are designed to integrate smoothly with your current technology stack.
                </div>
            </div>
            <img src="wire-component.svg" className='w-[75%] mx-auto' />

            <div className='flex flex-col md:flex-row justify-around items-center gap-4 lg:gap-2 flex-wrap w-full'>
                {[{name:'figma.com', src:'figma.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}, {name:'sketch.com', src:'sketch.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}, {name:'adobe.com', src:'adobe.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}].map((item,index)=>(
                    <div className='border border-[#222222] p-4 h-80 lg:h-60 rounded-lg w-[80%] lg:w-96' key={index}>
                        <div className='border border-[#222222] h-full rounded-lg bg-gradient-to-br from-[#181818] via-[#080808] to-[#181818] flex flex-col justify-center items-start gap-3'>
                            <div className='flex justify-between px-6 w-full items-center'>
                                <div className='h-12 w-12 rounded-md border-2 border-[#222222]'></div>
                                <div className='h-10 flex gap-2 p-2 px-4 bg-[#1a1a1a] justify-center items-center rounded-xl'>
                                    <p className='text-sm font-bold'>View website</p>
                                    <img src="right-arrow.svg" className='-rotate-45 w-4'/>
                                </div>
                            </div>
                            <div className='px-6 text-white text-lg font-bold'>
                                {item.name}
                            </div>
                            <div className='px-6 text-white text-base font-thin'>
                                {item.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default WireComponent