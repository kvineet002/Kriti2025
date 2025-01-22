import React from 'react';
import Navbar from '../../components/LandingPage/Navbar.js';
import WireComponent from '../../components/LandingPage/WireComponent.js';
import HeroComponent from '../../components/LandingPage/HeroComponent.js';
import Testimonials from '../../components/LandingPage/Testimonials.js';
import Features from '../../components/LandingPage/Features.js';
import Faq from '../../components/LandingPage/Faq.js';

function LandingPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Navbar/>
      <HeroComponent/>
      <div className='flex flex-col w-full gap-16 my-12'>
        <Features/>
        <WireComponent/>
        <Testimonials/>
        <Faq/>
      </div>
      
    </div>
  )
}

export default LandingPage
