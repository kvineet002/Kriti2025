import React from 'react'
import Sidebar from '../../components/Home/Sidebar'
import ChatSection from '../../components/Home/ChatSection'

const Home = () => {
  return (
    
     <div className="flex h-screen w-full  no-scrollbar border-r-[0.2px] border-white">
     {/* Nav should take 20% of the width and remain fixed */}
     <div className="w-full h-full z-10 md:w-[20%] absolute md:relative">
       <Sidebar />
     </div>
     
     {/* The Hero content should take up the remaining 80% and be scrollable */}
     <div className="w-full md:w-[80%] flex flex-col items-center justify-center h-full gap-5">
       <ChatSection />
     </div>
   
   </div>
  )
}

export default Home