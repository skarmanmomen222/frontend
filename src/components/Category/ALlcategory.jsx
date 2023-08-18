import React from 'react'
import { Link } from 'react-router-dom'

const ALlcategory = () => {
    return (
        <div className=' '>
            <div className='w-[90%] mx-auto flex flex-col'>
                
                <div className='flex  flex-col w-[95%] mx-auto bg-white'>
                <div className='mb-10'>
                    <h1 className='text-xl text-gray-700 font-mono font-semibold'>All Categories</h1>
                </div>
                    <span className='text-md py-4 mb-8 text-gray-600 font-semibold cursive w-full border-b border-b-yellow-300'>curtain and drapes</span>
                    <div className='flex flex-wrap gap-y-5 gap-x-56 '>
                        <div className=''>
                            <h2 className='font-mono font-semibold '>Blinds</h2>
                            <div className='flex flex-col text-sm cursive gap-y-3 ml-5 mt-2'>
                                <Link className='text-gray-500'>Motorized Blinds</Link>
                                <Link className='text-gray-500'>Roller Blinds</Link>
                                <Link className='text-gray-500'>Roman Blinds</Link>
                                <Link className='text-gray-500'>Venetian Blinds</Link>
                                <Link className='text-gray-500'>Vertical Blinds</Link>
                                <Link className='text-gray-500'>Wooden Blinds</Link>
                  

                            </div>
                        </div>
                        <div className=''>
                            <h2 className='font-mono font-semibold '>Curtains</h2>
                            <div className='flex flex-col text-sm cursive gap-y-3 ml-5 mt-2'>
                                <Link className='text-gray-500'>Motorized Blinds</Link>
                                <Link className='text-gray-500'>Roller Blinds</Link>
                                <Link className='text-gray-500'>Roman Blinds</Link>
                                <Link className='text-gray-500'>Venetian Blinds</Link>
                                <Link className='text-gray-500'>Vertical Blinds</Link>
                                <Link className='text-gray-500'>Wooden Blinds</Link>
                  

                            </div>
                        </div>
                        <div className=''>
                            <h2 className='font-mono font-semibold '>Motorized Blinds</h2>
                            <div className='flex flex-col text-sm cursive gap-y-3 ml-5 mt-2'>
                                <Link className='text-gray-500'>Motorized Blinds</Link>
                                <Link className='text-gray-500'>Roller Blinds</Link>
                                <Link className='text-gray-500'>Roman Blinds</Link>
                                <Link className='text-gray-500'>Venetian Blinds</Link>
                                <Link className='text-gray-500'>Vertical Blinds</Link>
                                <Link className='text-gray-500'>Wooden Blinds</Link>
                  

                            </div>
                        </div>
                      
                      
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ALlcategory
