import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


import { useDispatch, useSelector } from 'react-redux'
import { shippingInfoget } from '../../store/reducers/cartReducer'
import { useAlert } from 'react-alert'

import { useNavigate } from 'react-router-dom'

import CheckOutSteps from './CheckOutSteps';
import { clearMsg, newOrder } from '../../store/reducers/OrderReducer';
import Loader from '../Loader';

const Payment = () => {
    const { error, success, loader } = useSelector(state => state.newOrder)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const alert = useAlert();
 
    const dispatch = useDispatch()
    const [address, setAddress] = useState("ar");

    const { shippingInfo, cartItems } = useSelector(state => state.cartReducer)

    console.log(cartItems, "cart")

    const navigate = useNavigate()
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingCharges,
        totalPrice: orderInfo?.totalPrice,
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(newOrder(order))



    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }
        if (success) {
            alert.success("your order has been placed")
            // navigate('/success')
        }
    }, [dispatch, error, success])



    return (
        <>
            {
                loader ? <Loader /> : <div>
                    <CheckOutSteps activeStep={2} />
                    <div className='w-full     flex justify-center items-center pb-10'>
                        <form onSubmit={submitHandler}  >
                            <div className='w-[250px] sm:w-96  mx-auto  flex flex-col    '>

                                <div className=' mb-5 text-center w-full border-b border-b-yellow-300'>
                                    <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Payment Details</h1>

                                </div>

                                <div className='flex flex-col gap-y-5'>

                                    <div className='flex flex-col gap-y-2   '>
                                        <div className='relative'>
                                            <CreditCardIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                            <input type="text"
                                                placeholder="Address"
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />

                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-2   '>
                                        <div className='relative'>
                                            <EventIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                            <input type="text"
                                                placeholder="Address"
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />

                                        </div>
                                        <div className='flex flex-col gap-y-2   '>
                                            <div className='relative'>
                                                <VpnKeyIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                                <input type="text"
                                                    placeholder="Address"
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />

                                            </div>
                                        </div>

                                        <input
                                            type="submit"
                                            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                                        
                                            className='w-full cursor-pointer transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono rounded-md   bg-yellow-300'
                                        />


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>

    )
}

export default Payment
