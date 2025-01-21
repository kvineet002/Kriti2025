import React from 'react'
import Sidebar from '../../components/Home/Sidebar'
import ChatSection from '../../components/Home/ChatSection'

const Home = () => {
  return (
    
     <div className="flex h-screen w-full">
     {/* Nav should take 20% of the width and remain fixed */}
     <div className="md:w-[20%] ">
       <Sidebar />
     </div>
     
     {/* The Hero content should take up the remaining 80% and be scrollable */}
     <div className="md:w-[80%]  ">
       <ChatSection />
     </div>
   
   </div>
  )
}

export default Home