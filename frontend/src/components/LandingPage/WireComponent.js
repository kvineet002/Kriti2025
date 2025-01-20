import React from 'react'

const WireComponent = () => {

  return (
    <div className=' m-4 h-auto flex flex-col justify-center items-center'>
        <div className='w-48 bg-[#262525ef] text-white p-2 py-4 text-center font-bold text-lg m-2 rounded-xl border border-1 border-black'>
            <p>Fueled by</p>
        </div>
        <div className='flex w-48 justify-around mt-[-0.5rem]'>
            <div className='h-4 w-3 flex flex-col justify-around'>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>

                <div className=' relative h-2 w-full inset-0'>
                <div className='bg-gray-700 absolute h-2 w-1/2 ml-[3px] '/>
                <div className='bg-gray-700 absolute opacity-50 rounded-xl h-1 w-10/12 mt-[0.67px]'/>
               </div>  
               <div className='bg-gray-700 rounded-md h-2 w-full'/>
            </div>
            <div className='h-4 w-3 flex flex-col items-center justify-center'>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>
                <div className='bg-gray-700 h-2 w-1/2 '/>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>
            </div>
            
            <div className='h-4 w-3 flex flex-col justify-around'>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>
                <div className='bg-gray-700 rounded-xl h-2 w-full my-[0.5px]'/>
                <div className='bg-gray-700 rounded-md h-2 w-full'/>
            </div>
            
            <div className='h-4 w-3 flex flex-col justify-around'>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>
                <div className='bg-gray-700 rounded-xl h-2 w-full my-[0.5px]'/>
                <div className='bg-gray-700 rounded-md h-2 w-full'/>
            </div>
            
            <div className='h-4 w-3 flex flex-col justify-around'>
                <div className='bg-gray-700 rounded-xl h-2 w-full'/>
                <div className='bg-gray-700 rounded-xl h-2 w-full my-[0.5px]'/>
                <div className='bg-gray-700 rounded-md h-2 w-full'/>
            </div>
            
        </div>
        <div className='flex w-full justify-around'>
            <svg viewBox='0 0 100 10' className='w-full border-2'>
                <path
                    stroke='black'
                    strokeWidth='0.8'
                    fill='none'
                    d="
                        M 39.4 0
                        v 0 5
                    "
                />
                <path
                    stroke='black'
                    strokeWidth='0.8'
                    fill='none'
                    d="
                        M 44.7 0
                        V 0 5
                    "
                />
                <path
                    stroke='black'
                    strokeWidth='0.8'
                    fill='none'
                    d="
                        M 50 0
                        V 0 5
                    "
                />
                <path
                    stroke='black'
                    strokeWidth='0.8'
                    fill='none'
                    d="
                        M 55.3 0
                        V 0 5
                    "
                />
                <path
                    stroke='black'
                    strokeWidth='0.8'
                    fill='none'
                    d="
                        M 60.6 0
                        V 0 5
                    "
                />
            </svg>
            {/* <div className='h-8 w-[6px] flex flex-col justify-around bg-black' />
            <div className='h-8 w-[6px] flex flex-col justify-around bg-black' />
            <div className='h-8 w-[6px] flex flex-col justify-around bg-black' />
            <div className='h-8 w-[6px] flex flex-col justify-around bg-black' /> */}
        </div>
    </div>
  )
}

export default WireComponent