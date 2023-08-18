import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Rating from '@mui/material/Rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SyncIcon from '@mui/icons-material/Sync';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import { addToCart } from '../../store/reducers/cartReducer';
import { useAlert } from 'react-alert'
const ProductSlider = ({ categoryslide, heading, categoryget }) => {
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const { loader, products } = useSelector(state => state.products)
    const alert = useAlert()
    // د.إv
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1030 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1030, min: 673 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 673, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const add_To_Cart = ({ id, name, price, image, stock, quantity }) => {

        console.log("add")
        dispatch(addToCart({
            product: id,
            name,
            price,
            image,
            stock,
            quantity
        }))

        alert.success("items add to cart")
        // // set to cart item local storage
        // localStorage.setItem("cartItems", JSON.stringify())
    }



    return (
        <>
            {
                loader ? <Loader /> :
                    <div className='w-full  mb-10  flex justify-center items-center'>


                        <div className='w-[95%]    px-10 rounded-lg  mx-auto'>
                            <div className=' whitespace-nowrap w-full '>
                                <h1 className='text-xl w-3/12  font-mono font-semibold border-b-2 text-gray-700 border-b-yellow-300 py-2 '>{heading}</h1>
                            </div>

                            <Carousel
                                swipeable={false}
                                draggable={false}
                                containerClass='container'

                                //   showDots={true}

                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={4000}
                                keyBoardControl={true}
                                itemClass="project-item"


                            >
                                {
                                    products && products.map((product) => {
                                        if (product.category === categoryget) {
                                            return <Link Link to={`/product/${product._id}`} key={product._id}>
                                                <div className='flex   
                                                group relative overflow-hidden hover:shadow-lg transition-all duration-150
                                                rounded-md shadow-sm shadow-gray-200  w-[200px] flex-col max-w-[280px]   px-2 py-6'>
                                                    <div className='w-full h-[25vh]'>
                                                        <img src={product.images[0]?.url} className='w-full h-full object-cover object-center ' alt="" />
                                                    </div>
                                                    <p>{product.name}</p>

                                                    <div className='flex  gap-2 items-center'>
                                                        <Rating name="size-small" defaultValue={product.ratings} size="small" />
                                                        <span className='text-xs text-gray-700'>(${product.numOfReviews} Reviews)</span>
                                                    </div>
                                                    <span className='text-red-400'>{product.price} د.إ</span>
                                                    {/* hover */}
                                                    <div className='absolute z-20 flex flex-col gap-y-2  top-16 -right-8
                                                    group-hover:right-5 transition-all duration-500'>
                                                        <Link to="#" className='hover:bg-red-600 transition-all duration-300 hover:text-white  w-7  rounded-full h-7 bg-white flex items-center justify-center'>
                                                            <span><i class="fa-regular fa-heart"></i></span></Link>


                                                        <Link onClick={() => add_To_Cart(
                                                            {
                                                                id: product._id,
                                                                name: product.name,
                                                                price: product.price,
                                                                image: product.images[0].url,
                                                                stock: product.stock,
                                                                quantity: 1
                                                            })} to="" className='hover:bg-red-600 transition-all duration-300 hover:text-white  w-7  rounded-full h-7 bg-white flex items-center justify-center'>

                                                            <span> <ShoppingCartCheckoutIcon className='text-gray-500 hover:text-white' /></span>
                                                        </Link>
                                                        <Link className='hover:bg-red-600 transition-all duration-300 hover:text-white  w-7  rounded-full h-7 bg-white flex items-center justify-center'>
                                                            <SyncIcon className='text-gray-500 hover:text-white' />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        }

                                    })


                                }
                            </Carousel>


                        </div>
                    </div>
            }

        </>
    )
}

export default ProductSlider
