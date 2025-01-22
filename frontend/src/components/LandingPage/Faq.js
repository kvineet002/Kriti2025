import {useState} from 'react'
import { motion } from 'framer-motion';

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
    <div className='flex flex-col lg:flex-row gap-6 w-full justify-between lg:px-40 px-28'>
        <div className='w-full lg:w-[30%]'>
        <div className='bg-[black] bg-opacity-50 text-white border border-1 border-[#444444] rounded-[48px] p-2 flex mr-auto gap-4 items-center w-32'>
                <div className='w-10 h-10 bg-gradient-to-b from-[#474747] to-[#1d1d1d] rounded-full '/>
                <div className='text-lg font-bold'>FAQ</div>
            </div>
        <div className='text-4xl my-6 font-semibold text-wrap'>Frequently Asked Questions</div>
        </div>

        <div className='w-full lg:w-[70%] p-4 flex flex-col gap-6'>
            {questions.map((question, index)=>(
                <div key={index} className='border-b border-b-[#444444] flex flex-col gap-2'>
                    <div className='flex justify-between items-center cursor-pointer p-4 ' onClick={()=>(
                        handleClick(question.id)
                    )}>
                        <div className='text-lg font-semibold'>{question.question}</div>
                        <div>{activeQuestion.indexOf(question.id) !== -1 ? '-' : '+'}</div>
                    </div>
                        {activeQuestion.indexOf(question.id) !== -1 && (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.5}}
                                className='p-4 text-sm font-thin'
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