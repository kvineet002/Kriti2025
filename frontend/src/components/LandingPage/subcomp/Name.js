import React from 'react'

const Name = ({name}) => {
  return (
    <div className='text-center text-[15vw] bg-gradient-to-b from-[#252525] to-black text-transparent bg-clip-text 
    font-extrabold oswald uppercase sm:tracking-[-10px]'>
      {name}
    </div>
  )
}

export default Name