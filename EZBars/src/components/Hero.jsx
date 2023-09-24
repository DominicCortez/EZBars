import React from 'react'
import { heroimage } from '../assets'

const Hero = () => {
  return (
    <div className='w-full bg-white py-24'>{/*Containter for Hero*/}
        <div className='max-w-[1480px] m-auto grid grid-cols-2'>{/*Create column grid to seperate image from text*/}
            <div>
            <p className='text-2xl text-[#313649] font-medium'>Manage Inventory Seamlessly</p>
            <h1 className='md:text-6xl text-5xl font-semibold'>
                Register Your Store and Start
                Managing Now!
            </h1>
            <p></p>
            <form></form>

            </div>


            <img src={heroimage}/>
        </div>

    </div>
  )
}

export default Hero