import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../subcomp/Heading';
import Name from '../subcomp/Name';
import Desc from '../subcomp/Desc';

const tweets = [
    {name: 'John Doe', tweet: 'This is a tweet about how great this company is. I am so happy with the service I received.', position: 'Founder & CEO', profileLink: 'https://twitter.com/johndoe'},
    {name: 'Jane Doe', tweet: 'This is a tweet about how great this company is. I am so happy with the service I received.', position: 'Founder & CEO', profileLink: 'https://twitter.com/janedoe'},
    {name: 'Alice Smith', tweet: 'Amazing experience! Highly recommend this company.', position: 'Marketing Manager', profileLink: 'https://twitter.com/alicesmith'},
    {name: 'Bob Johnson', tweet: 'The service was exceptional and the team was very professional.', position: 'Product Manager', profileLink: 'https://twitter.com/bobjohnson'},
    {name: 'Charlie Brown', tweet: 'I am extremely satisfied with the results. Great job!', position: 'Sales Director', profileLink: 'https://twitter.com/charliebrown'},
    {name: 'Diana Prince', tweet: 'Fantastic service and support. Will use again.', position: 'Customer Support', profileLink: 'https://twitter.com/dianaprince'},
    {name: 'Eve Adams', tweet: 'The team went above and beyond to meet our needs.', position: 'Operations Manager', profileLink: 'https://twitter.com/eveadams'},
    {name: 'Frank Castle', tweet: 'Top-notch service from start to finish.', position: 'Project Manager', profileLink: 'https://twitter.com/frankcastle'},
    {name: 'Grace Hopper', tweet: 'Highly professional and reliable. Great experience.', position: 'Software Engineer', profileLink: 'https://twitter.com/gracehopper'},
    {name: 'Hank Pym', tweet: 'The best company I have ever worked with.', position: 'Research Scientist', profileLink: 'https://twitter.com/hankpym'},
    {name: 'Ivy League', tweet: 'Outstanding service and attention to detail.', position: 'HR Manager', profileLink: 'https://twitter.com/ivyleague'},
    {name: 'Jack Sparrow', tweet: 'I am very impressed with the quality of service.', position: 'Creative Director', profileLink: 'https://twitter.com/jacksparrow'},
    {name: 'Karen Page', tweet: 'Exceptional service and great results.', position: 'Legal Advisor', profileLink: 'https://twitter.com/karenpage'},
    {name: 'Leo Messi', tweet: 'The team was very professional and efficient.', position: 'Athlete', profileLink: 'https://twitter.com/leomessi'},
    {name: 'Mia Wallace', tweet: 'I highly recommend this company for their excellent service.', position: 'Film Producer', profileLink: 'https://twitter.com/miawallace'}
];



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

                <div className= 'overflow-hidden z-20 h-[600px] flex gap-4 rounded-xl relative items-center'>
                    <div className="vertical-silder md:w-1/3 hidden  md:flex md:flex-col overflow-y-hidden md:gap-3">
                        <div className="slider-content">
                            {tweetSlider()}
                        </div>
                    </div>

                    <div className='vertical-slider md:w-1/3  flex flex-col gap-3'>
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