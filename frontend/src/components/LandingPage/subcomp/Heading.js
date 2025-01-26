import React from 'react'

const Heading = ({img, heading}) => {
  return (
    <div className='bg-[black] bg-opacity-50 text-white border border-1 border-[#444444] rounded-[48px] p-1 flex ml-2 items-center w-min justify-around'>
        <div className='w-10 h-10 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-full flex items-center justify-center'>
          <img src={img} className='w-7'/>
        </div>
        <div className='text-base font-bold mx-3'>{heading}</div>
    </div>
  )
}

export default Heading