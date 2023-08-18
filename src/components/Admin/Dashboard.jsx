import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { BsCurrencyDollar } from 'react-icons/bs'
import { RiProductHuntLine } from "react-icons/ri"
import { FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import FaceIcon from '@mui/icons-material/Face';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearError, productList } from '../../store/reducers/adminProductlist'
import { userList } from '../../store/reducers/productReducers'
const Dashboard = () => {
    const dispatch = useDispatch()
    const { orders, totalAmount, success, error, products } = useSelector(state => state.productList)

    const { users } = useSelector(state => state.productReducer)

    useEffect(() => {
        if (success) {
            dispatch(clearError())

        }

        dispatch(userList())
        dispatch(allOrders())
        dispatch(productList())

    }, [dispatch, success, error])

    return (
        <div className=' w-full   bg-white   mt-20 px-2 '>
            <div className='w-full items-center justify-center  bg-white flex flex-col top-36'>
                <div className='w-[90%] mx-auto  flex  flex-wrap  gap-x-16  md:gap-x-0  gap-y-5       '>


                    <div className=' w-[15%]  '>
                        <Sidebar />
                    </div>



                    <div className="flex-1  bg-slate  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
                        {/* card */}
                        <div className="flex   justify-between shadow-md items-center p-5 rounded-md gap-3">
                            <div className='flex flex-col text-gray-500 justify-start items-start '>
                                <h1 className='text-3xl font-bold'>{products.length}</h1>
                                <span className='text-md font-medium'>Products</span>
                            </div>
                            <div className='w-[46px] h-[47px] flex justify-center items-center text-xl rounded-full bg-[#28c76f1f]'>
                                <ProductionQuantityLimitsIcon className='text-[#28c76f] shadow-lg' />
                            </div>
                        </div>
                        {/* card */}
                        <div className="flex justify-between shadow-md items-center p-5 rounded-md gap-3">
                            <div className='flex flex-col text-gray-500 justify-start items-start '>
                                <h1 className='text-3xl font-bold'>{orders.length}</h1>
                                <span className='text-md font-medium'>Orders</span>
                            </div>
                            <div className='w-[46px] h-[47px] flex justify-center items-center text-xl rounded-full bg-[#28c76f1f]'>
                                <BorderAllIcon className='text-[#28c76f] shadow-lg' />
                            </div>
                        </div>
                        {/* card */}
                        <div className="flex justify-between shadow-md items-center p-5 rounded-md gap-3">
                            <div className='flex flex-col text-gray-500 justify-start items-start '>
                                <h1 className='text-3xl font-bold'>{users.length}</h1>
                                <span className='text-md font-medium'>Users</span>
                            </div>
                            <div className='w-[46px] h-[47px] flex justify-center items-center text-xl rounded-full bg-[#28c76f1f]'>
                                <FaceIcon className='text-[#28c76f] shadow-lg' />
                            </div>
                        </div>

                        {/* card */}
                        <div className="flex justify-between shadow-md items-center p-5 rounded-md gap-3">
                            <div className='flex flex-col text-gray-500 justify-start items-start '>
                                <h1 className='text-xl font-bold'>{totalAmount}</h1>
                                <span className='text-md font-medium'>Amout</span>
                            </div>

                        </div>




                    </div>




                </div>



            </div>



        </div>


    )
}

export default Dashboard
