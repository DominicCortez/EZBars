import React from 'react'
import { FBLogo,TwitterLogo,LILogo } from '../assets'

const FooterEnd = () => {
  return (
    <div className='w-full bg-gray-400 py-4'>
        <div className='text-center'>

            <div className='items-center flex justify-center gap-7 '>
                <img src={FBLogo} className='h-[40px]'/>
                <img src={TwitterLogo} className='h-[40px]'/>
                <img src={LILogo} className='h-[40px]'/>
            </div>
                <div className='hidden md:flex justify-center text-2xl items-center'>{/*Menu Options*/}
                <ul className='flex gap-9'>{/*List Menu Options*/}
                    <li>Home</li>
                    <li>About</li>
                    <li>Support</li>
                </ul>
            </div>
            <div>@2023 EZBars | All Rights Reserved</div>
        </div>
    </div>
  )
}

export default FooterEnd