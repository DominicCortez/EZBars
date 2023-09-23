import React, { useState } from 'react'
import { logo,burg,close } from '../assets'

const Navbar = () => {

    const [toggle,setToggle]=useState(false)
    const handleClick = ()=> setToggle(!toggle)

  return (
    <div className='w-full h-[80px] bg-white border-b'>  {/*Main Navbar*/}
        <div className='md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center'> {/*Navbar Items*/}

            <img src={logo} className='h-[90px]'/>{/*Logo Left*/}

            <div className='hidden md:flex items-center'>{/*Menu Options*/}
            <ul className='flex gap-4'>{/*List Menu Options*/}
                <li>Home</li>
                <li>About</li>
                <li>Support</li>
            </ul>
        </div>

        <div className='hidden md:flex'>{/*End Buttons >Right */}
        <button className='gap-2 px-6'>Login</button>
        <button className=' px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold'>Sign Up</button>
        </div>

        <div className='md:hidden' onClick={handleClick}>{/*If screen small create burger*/}
            <img src={toggle?close:burg}/>
        </div>

        </div>
        <div className={toggle?'absolute z-10 p-4 bg-white w-full px-8 md:hidden':'hidden'}> {/*Screen small side menu*/}
            <ul>
                <li className='p-4 hover:bg-gray-100'>Home</li>
                <li className='p-4 hover:bg-gray-100'>About</li>
                <li className='p-4 hover:bg-gray-100'>Support</li>
            </ul>
            <div className='flex flex-col my-4 gap-4'>
                <button className='gap-2 px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold'>Login</button>
                <button className=' px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold'>Sign Up</button>
            </div>
        </div>

    </div>
  )
}

export default Navbar