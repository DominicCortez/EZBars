import React from 'react'
import { heroimage } from '../assets'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate('/signup');
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
            <button onClick={navigateSignup} className=' px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold'>Sign Up</button>{/*Signup button*/}
            </form>

            </div>


            <img className='md:order-last rounded order-first'src={heroimage}/>{/*Image Right*/}
        </div>

    </div>
  )
}

export default Hero