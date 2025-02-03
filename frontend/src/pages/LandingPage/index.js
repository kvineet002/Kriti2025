import React from 'react';
import Navbar from '../../components/LandingPage/section/Navbar.js';
import HeroComponent from '../../components/LandingPage/section/HeroComponent.js';
import Testimonials from '../../components/LandingPage/section/Testimonials.js';
import Features from '../../components/LandingPage/section/Features.js';
import Faq from '../../components/LandingPage/section/Faq.js';
import Integrations from '../../components/LandingPage/section/Integrations.js';
import Footer from '../../components/LandingPage/section/Footer.js';

function LandingPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Navbar/>
      <HeroComponent/>
      <div className='flex flex-col w-full gap-16 mt-12'>
        {/* <Features/> */}
        <Integrations/>
        <Testimonials/>
        <Faq/>
        <Footer/>
      </div>
      
    </div>
  )
}

export default LandingPage
