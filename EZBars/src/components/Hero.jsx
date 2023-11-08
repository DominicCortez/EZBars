import React from 'react'
import { heroimage } from '../assets'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <div className='w-full bg-gray-400 py-24'>{/*Containter for Hero*/}
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]'>{/*Create column grid to seperate image from text*/}
            <div>{/*Content a*/}
            <p className='gap-4 py-2 text-2xl text-gray-900 font-medium'>Manage Inventory Seamlessly</p>
            <h1 className='md:leading-[72px] md:text-6xl text-white text-5xl font-semibold'>
                Register Your Store and Start
                Managing Now!
            </h1>
            <p className='text-lg text-gray-900 py-4'>Sales and Inventory Management for Small Businesses</p>
            <form>
            <button onClick={navigateLogin} className=' px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1'>Login</button>{/*Signup button*/}
            </form>

            </div>


            <img className='md:order-last rounded order-first'src={heroimage}/>{/*Image Right*/}
        </div>

    </div>
  )
}

export default Hero