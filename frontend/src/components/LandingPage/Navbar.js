import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black h-20 flex gap-10 items-center justify-start p-4'>

        <div className='text-white text-3xl font-bold'>Engine</div>

        <div className='flex gap-10'>
            {[{name: 'Home', link: '/home'}, {name: 'About', link: '/about'}, {name: 'Contact', link: '/contact'}].map((item, index) => (
                <div>
                    {item.name}
                </div>
            ))}
        </div>

            <div>
                Get Started
            </div>
    </div>
  )
}

export default Navbar