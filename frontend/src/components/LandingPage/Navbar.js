import {useState} from 'react'
import {motion} from 'framer-motion'
const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
return (
    <div className='bg-black flex gap-10 items-center justify-start px-8 py-6'>

            <div className='text-white text-3xl font-bold px-16'>Engine</div>

            <div className='gap-14 justify-center items-center hidden md:flex'>
                    {[{name: 'Home', link: '/home'}, {name: 'About', link: '/about'}, {name: 'Contact', link: '/contact'}].map((item, index) => (
                            <div className='font-thin opacity-60 hover:opacity-100 cursor-pointer text-lg' key={index}>
                                    {item.name}
                            </div>
                    ))}
            </div>

            <motion.div
        className="ml-auto border-2 h-10 text-lg flex px-6 items-center justify-center rounded-[48px] cursor-pointer border-[#222222] gap-2"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ opacity: 0.8 }}
      >
        <div>Get Started</div>
        <motion.img
          src="right-arrow.svg"
          initial={{ x: 0 }}
          animate={isHovered ? { x: 8 } : { x: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
)
}

export default Navbar