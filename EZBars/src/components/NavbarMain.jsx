import React, { useState } from 'react'
import { logo,burg,close } from '../assets'
import { useNavigate } from 'react-router-dom';

const NavbarMain = () => {

    const [toggle,setToggle]=useState(false)
    const handleClick = ()=> setToggle(!toggle)

    const navigate = useNavigate();

    const navigateSignout = () => {
        navigate('/');
    };

  return (
    <div className='w-full h-[80px] bg-white border-b'>  {/*Main Navbar*/}
        <div className='md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center'> {/*Navbar Items*/}

            <img src={logo} className='h-[90px]'/>{/*Logo Left*/}

           

        <div className='hidden md:flex'>{/*End Buttons >Right */}
        <button onClick={navigateSignout} className=' px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1'>Logout</button>
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

export default NavbarMain