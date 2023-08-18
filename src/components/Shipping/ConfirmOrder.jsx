import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CheckOutSteps from './CheckOutSteps'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const ConfirmOrder = () => {
   
    const { shippingInfo, cartItems } = useSelector(state => state.cartReducer)
    const { user } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


    const proceedToPaymentHandler = () => {
        const data = {
            shippingCharges,
            tax,
            subtotal,
            totalPrice,
            address
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate("/process/payment")
    }

    return (
        <div className='w-full '>
            <div className='mb-10'>
                <CheckOutSteps activeStep={1} />
            </div>
            <div className='w-[80%] mx-auto flex flex-col md:flex-row gap-y-12   gap-x-10  divide-x-0 md:divide-x-2 '>

                <div className='flex flex-col gap-y-10 w-full  md:w-[60%] '>
                    <div className='flex flex-col gap-y-5'>
                        <h1 className=' text-md md:text-2xl text-gray-900 font-mono'>
                            Shipping Info
                        </h1>
                        <div className='md:ml-10 cursive flex flex-col gap-y-2'>
                            <h2 className='flex gap-x-5'>Name <span>{user.name}</span></h2>
                            <h2 className='flex gap-x-5'>Phone <span>{shippingInfo.phoneNo}</span></h2>
                            <h2 className='flex gap-x-5'>Address <span>{address}</span></h2>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-10'>
                        <h2 className='text-md md:text-2xl text-gray-900 font-mono'>Your Cart Items</h2>
                        <div className='flex flex-col gap-y-5 md:ml-10'>
                            {cartItems && cartItems.map((items) => (
                                <div className='flex justify-between items-center  '>
                                    <div className='flex gap-x-2 items-center'>
                                        <div className='w-[5vmax] h-[4vmax]'>
                                            <img src={items.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <span>{items.name}</span>
                                    </div>
                                    <div>
                                        <span>{items.quantity} <CloseIcon s className='text-gray-500' /> {items.price}</span> = {items.price * items.quantity}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='flex flex-col     px-5 md:ml-10 gap-y- w-full  md:w-[30%]'>
                    <h2 className='border-b  border-b-gray-700 text-center'>Order Summery</h2>
                    <div className='flex flex-col gap-y-2 border-b pb-5 pt-2 border-b-gray-700  '>
                        <span className='flex justify-between text-gray-700  '>Subtotal <span>{subtotal}</span></span>
                        <span className='flex justify-between text-gray-700 '>Shipping Chargers <span>{shippingCharges}</span></span>
                        <span className='flex justify-between text-gray-700 '>Gst <span>{tax}</span></span>
                    </div>
                    <span className='flex justify-between text-gray-900 py-5 '>Total <span>{totalPrice}</span></span>
                    <button onClick={proceedToPaymentHandler} className='w-full h-10 text-xs md:text-md bg-red-500 rounded-md text-white font-bold hover:bg-transparent transition-all duration-300 border hover:text-gray-900 border-red-400'>Proceed To Payment</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder

