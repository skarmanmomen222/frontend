import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <div className='flex justify-center items-center w-full h-[60vh]'>
            <div className='flex flex-col gap-y-10 items-center'>
                <h1 className='cursive font-semibold text-gray-800'>Your Order Has been Placed</h1>
                <Link to="/myorders">
                    <button className=' font-mono font-semibold  px-6 py-2 bg-yellow-300 rounded-md shadow-md'>View Orders</button></Link>
            </div>
        </div>
    )
}

export default Success
