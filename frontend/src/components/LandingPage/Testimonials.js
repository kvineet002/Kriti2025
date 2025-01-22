import React from 'react';
import { motion } from 'framer-motion';

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

const Testimonials = () => {

    return (
        <div className=' bg-black flex flex-col'>
            <div className='text-center text-7xl lg:text-[150px] bg-gradient-to-b from-[#292828] to-black text-transparent bg-clip-text 
              font-extrabold '>
                TESTIMONIALS
            </div>
            <div className='flex flex-col mx-auto lg:-mt-28 gap-2 w-[80%] lg:w-[full]
     '>
                <div className='bg-[black] bg-opacity-50 text-white border border-1 border-[#444444] rounded-[48px] p-1 flex ml-2 w-48 gap-4 items-center '>
                    <div className='w-10 h-10 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-full '/>
                    <div className='text-lg font-bold'> Testimonials</div>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <div className='text-4xl p-4'>
                    Our AI Capabilities
                    </div>
                    <div className='text-sm text-wrap  md:w-[30rem] p-4 '>
                    Discover the cutting-edge capabilities of our AI solutions designed to transform your business operations.
                    </div>
                </div>



                <div className='mx-auto bg-white bg-opacity-5 rounded-lg p-4 h-[720px] w-full flex gap-3'>
                    <motion.div className='h-full lg:w-1/3 w-full overflow-y-hidden flex flex-col gap-3'
                        
                    >
                        {
                            tweets.map((tweet,index)=>(
                                <div className='w-full h-[420px] bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3' key={index}> 
                                    <h1 className='font-bold text-2xl p-4'> “ </h1>
                                    <p className='text-white  px-4'>
                                        {tweet.tweet}
                                    </p>
                                    <div className='flex justify-between items-center p-4'>
                                        <div className='flex flex-col'>
                                            <div className='font-bold'>{tweet.name}</div>
                                            <div>{tweet.position}</div>
                                        </div>
                                        <div className='w-12 h-12 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-lg '/>
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                    <motion.div className='h-full lg:w-1/3 hidden lg:flex lg:flex-col overflow-y-hidden lg:gap-3'>
                    {
                            tweets.map((tweet,index)=>(
                                <div className='w-full h-[420px] bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3' key={index}> 
                                    <h1 className='font-bold text-2xl p-4'> “ </h1>
                                    <p className='text-white  px-4'>
                                        {tweet.tweet}
                                    </p>
                                    <div className='flex justify-between items-center p-4'>
                                        <div className='flex flex-col'>
                                            <div className='font-bold'>{tweet.name}</div>
                                            <div>{tweet.position}</div>
                                        </div>
                                        <div className='w-12 h-12 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-lg '/>
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                    <motion.div className='h-full lg:w-1/3 hidden lg:flex lg:flex-col overflow-y-hidden lg:gap-3'>
                    {
                            tweets.map((tweet,index)=>(
                                <div className='w-full h-[420px] bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3' key={index}> 
                                    <h1 className='font-bold text-2xl p-4'> “ </h1>
                                    <p className='text-white  px-4'>
                                        {tweet.tweet}
                                    </p>
                                    <div className='flex justify-between items-center p-4'>
                                        <div className='flex flex-col'>
                                            <div className='font-bold'>{tweet.name}</div>
                                            <div>{tweet.position}</div>
                                        </div>
                                        <div className='w-12 h-12 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-lg '/>
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                </div>
                
            </div>
        </div>
      )
}

export default Testimonials