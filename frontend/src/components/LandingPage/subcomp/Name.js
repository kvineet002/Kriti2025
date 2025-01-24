import React from 'react'

const Name = ({name}) => {
  return (
    <div className='text-center text-5xl sm:text-9xl lg:text-[220px] bg-gradient-to-b from-[#171717] to-black text-transparent bg-clip-text 
    font-extrabold oswald uppercase sm:tracking-[-10px]'>
      {name}
    </div>
  )
}

export default Name