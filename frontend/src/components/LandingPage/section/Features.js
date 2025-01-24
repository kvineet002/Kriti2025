import React from 'react'
import Heading from '../subcomp/Heading'
import Name from '../subcomp/Name'
import Desc from '../subcomp/Desc'

const Features = () => {
  return (
    <div className=' bg-black flex flex-col'>

            <Name name={"Features"}/>
            <div className='flex flex-col mx-auto lg:-mt-40 gap-2 w-[80%] lg:w-[full] sm:-mt-12'>
                <Heading heading={"Features"}/>
                <Desc tag1={"Our AI Capabilities"} tag2={"Discover the cutting-edge capabilities of our AI solutions designed to transform your business operations."}/>

                <div className='mx-auto w-full flex justify-around gap-3'>
                    <div className='border border-[#222222] w-full lg:w-1/3 h-96 rounded-lg'></div>
                    <div className='border border-[#222222] w-full lg:w-1/3 h-96 rounded-lg'></div>
                    <div className='flex flex-col w-full lg:w-1/3 gap-3 h-96'>
                        <div className='border border-[#222222] h-48 rounded-lg'></div>
                        <div className='border border-[#222222] h-48 rounded-lg'></div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Features