import {useState} from 'react'
import { motion } from 'framer-motion';
import Heading from '../subcomp/Heading';

const questions = [{
    id: 1,
    question: "What types of tasks can be automated with this app?",
    answer: "Our app can automate a wide range of tasks, including scheduling, data entry, file management, notifications, and complex workflows across various business processes. Whether you need to automate repetitive tasks or streamline multi-step processes, our app offers the flexibility to meet your needs."
},
    {
        id: 2,
        question: "How secure is my data in the app?",
        answer: "We take data security very seriously. Our app uses state-of-the-art encryption and security protocols to protect your data. We also adhere to strict data privacy regulations to ensure that your information is safe and secure at all times."
    },

    {
        id: 3,
        question: "Can I integrate this app with other tools I use?",
        answer: "Yes, our app is designed to integrate seamlessly with a wide range of tools and platforms. Whether you use CRM software, project management tools, or communication platforms, our app can be easily integrated to streamline your workflows and improve productivity."
    },

    {
        id: 4,
        question: "How easy is it to set up and use the app?",
        answer: "Our app is designed to be user-friendly and intuitive. You don't need any technical expertise to set up and use the app. We provide detailed documentation and tutorials to help you get started quickly and easily. If you have any questions or need assistance, our support team is always available to help."
    },

    {
        id: 5,
        question: "What kind of support is available if I need help?",
        answer: "We offer a range of support options to help you get the most out of our app. Our support team is available 24/7 to answer any questions you may have and provide assistance with any issues you encounter. We also offer online documentation, tutorials, and training resources to help you learn how to use the app effectively."

    }

]

const Faq = () => {
    const [activeQuestion, setActiveQuestion] = useState([]);
    
    const handleClick = (id) => {
        if(activeQuestion.indexOf(id) !== -1){
            setActiveQuestion(activeQuestion.filter(question => question !== id))
        } else {
            setActiveQuestion([...activeQuestion, id])
        }
    }

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full justify-between md:px-24 px-5'>
        <div className='w-full lg:w-[30%] flex flex-col items-start mx-auto'>
         <Heading heading={"FAQ"}/>
        <div className=' text-white md:text-4xl translate-x-2 md:translate-x-0 text-xl md:my-6 font-semibold text-wrap mt-3'>Frequently Asked Questions</div>
        </div>

        <div className=' lg:w-[70%] flex flex-col gap-6'>
            {questions.map((question, index)=>(
                <div key={index} className='border-b border-b-[#444444] flex flex-col '>
                    <div className='flex justify-between items-center cursor-pointer p-2 ' onClick={()=>(
                        handleClick(question.id)
                    )}>
                        <div className='text-sm md:text-lg text-white font-semibold'>{question.question}</div>
                        <div className=' text-white'>{activeQuestion.indexOf(question.id) !== -1 ? '-' : '+'}</div>
                    </div>
                        {activeQuestion.indexOf(question.id) !== -1 && (
                            <motion.div
                                
                                className='px-2 pb-4 text-sm font-thin text-white'
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