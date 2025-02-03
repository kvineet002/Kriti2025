import {useState} from 'react'
import { motion } from 'framer-motion';
import Heading from '../subcomp/Heading';

const questions = [{
    id: 1,
    question: "What types of tasks can be automated with this app?",
    answer: "Our Text-to-Website Generator automates layout design, content formatting, and responsiveness testing, making the entire process of website development hassle-free."	
},
    {
        id: 2,
        question: "Can I customize the generated website?",
        answer: "Yes, the generator allows you to tweak and refine designs post-generation to align perfectly with your vision."
    },

    {
        id: 3,
        question: "Do I need coding knowledge to use this tool?",
        answer: "Absolutely not! Our solution is built for users with little to no coding experience, making professional website creation accessible to everyone."
    },

    {
        id: 4,
        question: "Is the generated website responsive?",
        answer: "Yes, every website generated is fully responsive and optimized for all devices."
    },

    {
        id: 5,
        question: "Can I integrate third-party tools or APIs into the generated website?",
        answer: "Our platform supports integration with popular tools and APIs for enhanced functionality and scalability."

    }

]

const Faq = () => {
    const [activeQuestion, setActiveQuestion] = useState([]);
    
    const handleClick = (id) => {
        setActiveQuestion(activeQuestion === id ? null : id); // Toggle open/close
    };
    

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full justify-between md:px-24 px-5 -mb-16'>
        <div className='w-full lg:w-[30%] flex flex-col items-start mx-auto'>
         <Heading heading={"FAQ"} img={"bx-question-mark.svg"}/>
        <div className=' text-white md:text-4xl translate-x-2 md:translate-x-0 text-xl md:my-6 font-semibold text-wrap mt-3'>Frequently Asked Questions</div>
        </div>

        <div className=' lg:w-[70%] flex flex-col gap-6'>
        {questions.map((question, index) => (
    <div key={index} className="border-b border-b-[#444444] flex flex-col">
        <div
            className="flex justify-between items-center cursor-pointer p-2"
            onClick={() => handleClick(question.id)}
        >
            <div className="text-sm md:text-lg text-white font-semibold">
                {question.question}
            </div>
            <div className="text-white">
                {activeQuestion === question.id ? "-" : "+"}
            </div>
        </div>
        {activeQuestion === question.id && (
            <motion.div
                key={question.id}
                className="px-2 pb-4 text-sm font-thin text-white"
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 1000 }}  // Set a maxHeight that is larger than the content
                exit={{ opacity: 0, maxHeight: 0 }}
                style={{ overflow: 'hidden' }}
            >
                {question.answer}
            </motion.div>
        )}
    </div>
))}



        </div>
        
    </div>
  )
}

export default Faq