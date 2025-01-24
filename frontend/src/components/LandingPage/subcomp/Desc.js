import React from 'react'

const Desc = ({tag1, tag2}) => {
  return (
    <div className='flex flex-wrap justify-between text-white'>
        <div className='text-4xl p-4'>
            {tag1}
        </div>
        <div className='text-sm text-wrap  md:w-[30rem] p-4 '>
           {tag2}
        </div>
    </div>
  )
}

export default Desc