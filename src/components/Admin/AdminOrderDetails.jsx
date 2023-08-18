import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearMsg, orderInfo, orderStatusUpdate } from '../../store/reducers/orderDetailsReducer'
import { useAlert } from 'react-alert'
import Loader from '../Loader'
import CloseIcon from '@mui/icons-material/Close';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const AdminOrderDetails = () => {
    const { id } = useParams()
    const [status, setStatus] = useState("");
    const { loader, error, isProcess, order } = useSelector(state => state.orderDetails)
    const dispatch = useDispatch()
    const alert = useAlert()


    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("orderStatus", status);

        dispatch(orderStatusUpdate({ id, myForm }));
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }

        if (isProcess) {
            alert.success("product status updated")
            dispatch(clearMsg())
        }

        dispatch(orderInfo(id))


    }, [dispatch, error, isProcess])


    return (
        <>
            {loader ? <Loader /> :
                <div className='w-full '>

                    <div className='w-[80%] mx-auto flex flex-col md:flex-row gap-y-12   gap-x-10  divide-x-0 md:divide-x-2 '>

                        <div className='flex flex-col gap-y-10 w-full  md:w-[70%] '>
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
                                                ? "text-green-800"
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


                   
                       <div className={`flex flex-col        ${order.orderStatus === "Delivered" ? "hidden" : "block"}   px-5 md:ml-10 gap-y-3 w-full  md:w-[40%]`}>
                            <h2 className=' text-center text-lg font-mono'>Process Order</h2>
                            <form
                                className="updateOrderForm"
                                onSubmit={updateOrderSubmitHandler}
                            >
                                <div className='w-full relative mb-6'>
                                    <AccountTreeIcon className='absolute top-3 left-5 ' />
                                    <select className='w-full  px-16  md:px-20 py-3 outline-none rounded-md cursive border border-gray-500' onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {order.orderStatus === "Processing" && (
                                            <option value="Shipped">Shipped</option>
                                        )}

                                        {order.orderStatus === "Shipped" && (
                                            <option value="Delivered">Delivered</option>
                                        )}
                                    </select>
                                </div>

                                <button type='submit'
                                    //  disabled={
                                    //     loading ? true : false || status === "" ? true : false
                                    //   }
                                    className='w-full h-10 text-xs md:text-lg bg-red-500 rounded-md text-white font-bold hover:bg-transparent transition-all duration-300 border hover:text-gray-900 border-red-400'>Procees</button>


                            </form>

                        </div>
                  
                    </div>
                </div >}
        </>
    )
}

export default AdminOrderDetails
