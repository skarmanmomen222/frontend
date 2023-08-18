import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

import { useAlert } from 'react-alert';
import Loader from '../Loader';
import { clearMsg, orderInfo } from '../../store/reducers/orderDetailsReducer';

const OrderDetails = () => {
    const { id } = useParams()

    const { loader, error, success, order } = useSelector(state => state.orderDetails)
    const dispatch = useDispatch()
    const alert = useAlert()
    const { shippingInfo, cartItems } = useSelector(state => state.cartReducer)
    const { user } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;




    useEffect(() => {

        if (success) {
            // alert.success(id)
        }
        dispatch(orderInfo(id))

    }, [dispatch, error, success])


    return (
        <>
            {loader ? <Loader /> :
                <div className='w-full '>

                    <div className='w-[80%] mx-auto flex flex-col md:flex-row gap-y-12   gap-x-10  divide-x-0 md:divide-x-2 '>

                        <div className='flex flex-col gap-y-10 w-full  md:w-[60%] '>
                            <div className='mb-5'>
                                <h1 className='text-xl text-red-700'>Order #{order && order._id}</h1>
                            </div>
                            <div className='flex flex-col gap-y-5'>
                                <h1 className=' text-md md:text-2xl text-gray-900 font-mono'>
                                    Shipping Info
                                </h1>
                                <div className='md:ml-10 cursive flex flex-col gap-y-2'>
                                    <h2 className='flex gap-x-5'>Name <span>{order?.user?.name}</span></h2>
                                    <h2 className='flex gap-x-5'>Phone <span>    {order.shippingInfo && order.shippingInfo.phoneNo}</span></h2>
                                    <h2 className='flex gap-x-5'>Address <span>

                                        {`${order.shippingInfo && order.shippingInfo.address},
                                        ${order.shippingInfo && order.shippingInfo.phoneNo},
                                        ${order.shippingInfo && order.shippingInfo.city},
                                        ${order.shippingInfo && order.shippingInfo.state},
                                        ${order.shippingInfo && order.shippingInfo.pinCode},
                                        ${order.shippingInfo && order.shippingInfo.country}
                                        
                                        `}
                                    </span>


                                    </h2>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-7'>
                                <h2 className='text-md md:text-2xl text-gray-900 font-mono'>Payment</h2>
                                <div className='flex flex-col gap-y-5 md:ml-10'>
                                    <p
                                        className={
                                            order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "text-green-300"
                                                : "text-red-700"
                                        }
                                    >
                                        {order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                        <p className='text-slate-700 flex gap-x-5 font-semibold font-mono'>Amount:
                                            <span>{order.totalPrice && order.totalPrice}</span></p>
                                    </p>

                                </div>
                            </div>
                            <div className='flex flex-col gap-y-6'>
                                <h2 className='text-md md:text-2xl text-gray-900 font-mono'>Order Status</h2>
                                <div className='flex flex-col gap-y-5 md:ml-10'>
                                    <p
                                        className={
                                            order.orderStatus && order.orderStatus === "Delivered"
                                                ? "text-green-300"
                                                : "text-red-700"
                                        }
                                    >
                                        {order.orderStatus && order.orderStatus}
                                    </p>

                                </div>
                            </div>

                            {/* cart items */}
                            <div className='flex flex-col gap-y-10  '>
                                <h2 className='text-md md:text-2xl text-gray-900 font-mono'>Your Cart Items</h2>
                                <div className='flex flex-col gap-y-5 md:ml-10 divide-y-2 '>
                                    {order && order.orderItems.map((items) => (
                                        <div className='flex sm:justify-between pt-3  items-center flex-wrap gap-y-4 '>
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


                    </div>
                </div >}
        </>
    )
}

export default OrderDetails
