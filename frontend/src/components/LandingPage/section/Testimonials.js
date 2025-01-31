import React from 'react';
import Heading from '../subcomp/Heading';
import Name from '../subcomp/Name';
import Desc from '../subcomp/Desc';
import { tweets } from '../../../constants.js';

//Tweets are coming form constant.js file make changes there

const tweetSlider = () => {
    return (
        [...tweets,...tweets,...tweets, ...tweets].map((tweet, index) => (
            <div className='w-full bg-white bg-opacity-5 rounded-lg p-4 flex flex-col gap-4 myborder' key={index}>
            <h1 className="font-bold text-2xl p-4">“</h1>
            <p className="text-white px-4">{tweet.tweet}</p>
            <div className="flex justify-between items-center p-4">
                <div className="flex flex-col">
                <div className="font-bold">{tweet.name}</div>
                <div>{tweet.position}</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-lg" />
            </div>
            </div>
        ))
    )
}

const Testimonials = () => {
    return (
        <div className=' overflow-hidden bg-black flex px-5 md:px-24 flex-col text-white items-center '>
            
            <Name name={"Testimonials"}/>
            <div className='flex flex-col lg:-mt-48 gap-2 lg:w-[full] sm:-mt-12'>
                <Heading heading={"Testimonials"}/>             
                <Desc tag1={"Our AI Capabilities"} tag2={"Discover the cutting-edge capabilities of our AI solutions designed to transform your business operations."}/>

                <div className= 'overflow-hidden h-[500px] flex gap-4 rounded-xl relative items-center'>
                    <div className="absolute z-10 grad w-full h-full"/>
                    <div className="vertical-silder md:w-1/3 hidden  md:flex md:flex-col overflow-y-hidden md:gap-3">
                        <div className="slider-content">
                            {tweetSlider()}
                        </div>
                    </div>

                    <div className='vertical-slider md:w-1/3 w-full  flex flex-col gap-3'>
                        <div className="reverse-slider-content">
                            {tweetSlider()}
                        </div>
                    </div>

                    <div className='vertical-sider md:w-1/3 hidden  md:flex md:flex-col overflow-y-hidden md:gap-3'>
                        <div className="slider-content">
                            {tweetSlider()}
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
      )
}

export default Testimonials