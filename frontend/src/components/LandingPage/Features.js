import React from 'react'

const Features = () => {
  return (
    <div className=' bg-black flex flex-col'>
            <div className='text-center text-7xl lg:text-[150px] bg-gradient-to-b from-[#292828] to-black text-transparent bg-clip-text 
              font-extrabold '>
                FEATURES
            </div>
            <div className='flex flex-col mx-auto lg:-mt-28 gap-2 w-[80%] lg:w-[full]'>

                <div className='bg-[black] bg-opacity-50 text-white border border-1 border-[#444444] rounded-[48px] p-2 pr-4 flex mr-auto gap-4 items-center '>
                    <div className='w-10 h-10 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-full '/>
                    <div className='text-lg font-bold'>Features</div>
                </div>

                <div className='flex flex-wrap justify-between'>
                    <div className='text-4xl p-4'>
                        Our AI Capabilities
                    </div>
                    <div className='text-sm text-wrap  md:w-[30rem] p-4 '>
                        Discover the cutting-edge capabilities of our AI solutions designed to transform your business operations.
                    </div>
                </div>

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