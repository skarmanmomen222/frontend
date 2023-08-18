import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart, removeItemFromCart } from '../../store/reducers/cartReducer'
import CategoryList from '../Category/CategoryList'

const CartItem = ({ item }) => {
    const dispatch = useDispatch()


    const increaseQuantity = (id, quantity, stock) => {
        let newQty = quantity + 1
        if (stock <= quantity) return
        dispatch(addToCart({
            product: id,
            name: item.name,
            price: item.price,
            image: item.image,
            stock: stock,
            quantity: newQty
        }))

    }
    const decreseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1

        if (1 >= quantity) return
        dispatch(addToCart({
            product: id,
            name: item.name,
            price: item.price,
            image: item.image,
            stock: stock,
            quantity: newQty
        }))
    }

    const removeCart = (id) => {
        dispatch(removeItemFromCart(id))
    }


    return (
        <>



            <div className='flex     uppercase text-xs min-w-[340px]'>
                <div className='w-[30%] p-2 flex  items-center  gap-x-1   '>

                    <div className='w-[4vmax] h-[3vmax]'>
                        <img className='w-full h-full' src={item.image} alt="dsf" />
                    </div>
                    <div className='hidden md:block'>
                        <div className='flex flex-col gap-y-3   '>
                            <p>{item.name}</p>
                        </div>
                    </div>


                </div>
                <div className='w-[25%] pt-3 pl-1 text-[12px]  '>{item.price}</div>
                <div className='w-[25%] p-2'>
                    <div className='flex text-[17px] text-slate-800 bg-white   '>
                        <button onClick={() => decreseQuantity(item.product, item.quantity, item.stock)} className='md:px-3 md:py-1 px-0 py-0 font-bold  '>-</button>
                        <span className='px-3 py-1 text-slate-800'>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className='px-3 py-1 font-bold   '>+</button>
                    </div>

                </div>

                <div
                    onClick={() => removeCart(item.product)}
                    className='w-[25%] p-2 pl-2 cursor-pointer'>  <i class="fa-solid fa-trash text-red-700"></i></div>
                <div className='w-[25%] p-2 pl-3'>   ${item.price * item.quantity}</div>

            </div>

        </>
    )
}

export default CartItem
