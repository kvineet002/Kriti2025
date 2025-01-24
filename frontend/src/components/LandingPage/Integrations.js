import React from 'react'
import Heading from './subcomp/Heading';
import Name from './subcomp/Name';
import Desc from './subcomp/Desc';

const tools = [{name:'figma.com', src:'figma.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}, {name:'sketch.com', src:'sketch.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}, {name:'adobe.com', src:'adobe.svg', text: "Unlock the potential of automation, data synchronization, and improved experiences."}]

const Integrations = () => {

  return (
    <div className=' bg-black flex flex-col text-white'>
        <Name name={"Integrations"}/>
        <div className='flex flex-col mx-auto lg:-mt-40 gap-2 w-[80%] lg:w-[full]
      sm:-mt-12'>
            <Heading heading={"Integrations"}/>
            <Desc tag1={"Connect Effortlessly"} tag2={"Our AI solutions are designed to integrate smoothly with your current technology stack."}/>


            <img src="wire-component.svg" className='w-[75%] mx-auto' />
            <div className='flex flex-col lg:flex-row justify-around items-center gap-4 lg:gap-2 w-full'>
                {tools.map((item,index)=>(
                    <div className='border border-[#222222] p-4 lg:h-60 rounded-lg w-[90%] lg:w-96' key={index}>
                        <div className='border border-[#222222] h-full rounded-lg bg-gradient-to-br from-[#181818] via-[#080808] to-[#181818] flex flex-col justify-around items-start gap-3 py-3'>
                            <div className='flex justify-between px-6 w-full items-center gap-4'>
                                <div className='h-12 w-12 rounded-md border-2 border-[#222222]'></div>
                                <div className='h-10 flex gap-2 p-2 px-4 bg-[#1a1a1a] justify-center items-center rounded-xl'>
                                    <p className='text-sm font-bold'>View website</p>
                                    <img src="right-arrow.svg" className='-rotate-45 w-4 hidden sm:flex'/>
                                </div>
                            </div>
                            <div className='px-6 text-white md:text-lg font-bold'>
                                {item.name}
                            </div>
                            <div className='px-6 text-white text-sm md:text-base font-thin'>
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

export default Integrations