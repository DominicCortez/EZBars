import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-white py-[50px]'>{/*Containter for Hero*/}
        <div className='md:max-w-[1480px] m-auto max-w-[600px]'>{/*Create column grid to seperate image from text*/}
            <h1 className='text-center text-2xl font-bold text-[#536E96]'>Scan, Thrive, EZBars: Simplifying Success!</h1>
            <p className='text-center text-lg'>EZBars envisions a future where small businesses effortlessly manage inventory through intuitive barcode systems. We simplify complexities, allowing businesses to focus on growth. In our vision, the barcode becomes a symbol of simplicity, accuracy, and success. EZBars strives for a world where small businesses thrive unburdened by inventory concerns.</p>
        </div>
    </div>
  )
}

export default Footer