import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../../store/reducers/cartReducer'
import CartItem from './CartItem'

const Cart = () => {
    const { cartItems } = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const checkOutHandler = () => {
        navigate('/shipping')
    }
    return (
        <>
            {
                cartItems.length === 0 ? <div className='w-full h-[70vh] flex justify-center items-center'>
                    <div className='text-center  gap-y-2 flex justify-center items-center flex-col'>
                        <img className='w-[8vmax]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgqJoxRbjNEvWKhyeAzmCqR5zn76jAor_VxQ&usqp=CAU" alt="" />
                        <p className='font-semibold text-gray-500 cursive'>No Product in Your Cart</p>
                        <Link to="/shop">
                            <button className='w-[250px]  px-4 py-2 bg-gray-700 rounded-md hover:bg-transparent hover:border hover:border-red-400 hover:text-gray-800 text-white font-semibold'>
                                View Products
                            </button></Link>
                    </div>
                </div> :

                    <div className='px-2  lg:px-7 pt-5'>
                        <div className='    mx-auto p-4   rounded-md  '>

                            <div className='w-full  '>
                                <div className='w-full  '>
                                    <div className='flex font-mono mb-4 text-[8px] md:text-[13px]  uppercase   min-w-[340px] border-b border-b-gray-300'>
                                        <div className='w-[30%] p-2'>item</div>
                                        <div className='w-[25%] p-2'>price</div>
                                        <div className='w-[25%] p-2'>quantity</div>
                                        <div className='w-[25%] p-2'>remove</div>
                                        <div className='w-[25%] p-2'>subtotal</div>
                                    </div>

                                    {/* cart item */}
                                    {
                                        cartItems && cartItems.map((item) =>
                                        (
                                            <CartItem item={item} key={item.product} />
                                        )
                                        )
                                    }


                                    {/* gross total */}
                                    <div className='flex justify-end border-b w-full  whitespace-nowrap  '>
                                        <div className='flex w-[70%] md:w-[40%] items-center  p-3 border-t-2 border-t-red-400  gap-3'>
                                            <div className='w-full '>
                                                <p className='font-bold text-gray-700 text-xs md:text-md'>Gross Total</p>
                                            </div>

                                            <div className='w-full '>
                                                <span className='text-gray-600 pl-3 text-xs md:text-md font-semibold'>{

                                                    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                                                }</span>
                                            </div>
                                        </div>

                                    </div>

                                    {/*  check out */}
                                    <div className='flex justify-end  mt-4   '>
                                        <div className='flex  md:w-[38%] p-3 '>
                                            <button
                                                onClick={checkOutHandler}
                                                className='  transform  transition-all duration-300 px-10 md:px-20  text-xs md:text-md py-1 md:py-2 rounded-2xl text-white bg-orange-600 whitespace-nowrap'>
                                                Check Out</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>
    )
}

export default Cart
