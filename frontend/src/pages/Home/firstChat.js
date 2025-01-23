import React from 'react'
import Sidebar from '../../components/Home/Sidebar'
import ChatSection from '../../components/Home/ChatSection'
import FirstChatSection from '../../components/Home/firstChat'

const FirstChat = () => {
  return (
    
     <div className="flex h-screen w-full border-r-[0.2px] border-white">
     {/* Nav should take 20% of the width and remain fixed */}
     <div className="md:w-[20%] ">
       <Sidebar />
     </div>
     
     {/* The Hero content should take up the remaining 80% and be scrollable */}
     <div className="md:w-[80%]  flex gap-5 flex-col items-center justify-center ">
        <div className=' text-white text-3xl font-bold '>
            What do you want to create today?
        </div>

       <FirstChatSection />
     </div>
   
   </div>
  )
}

export default FirstChat