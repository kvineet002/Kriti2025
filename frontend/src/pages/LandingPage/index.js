import React from 'react';
import Navbar from '../../components/LandingPage/Navbar.js';
import WireComponent from '../../components/LandingPage/WireComponent.js';

function LandingPage() {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Navbar/>
      <WireComponent/>
    </div>
  )
}

export default LandingPage
