import React, { useEffect, useState } from 'react'
import ProductSlider from '../product/ProductSlider'
import { useDispatch, useSelector } from 'react-redux'
import { clearMsg, getProduct } from '../../store/reducers/productReducers'
import { useAlert } from 'react-alert'
import { Link, useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CachedIcon from '@mui/icons-material/Cached';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SyncIcon from '@mui/icons-material/Sync';
import CategoryList from '../Category/CategoryList'
import Loader from '../Loader'
import { addToCart } from '../../store/reducers/cartReducer'
import Rating from '@mui/material/Rating';
const Shop = () => {
    const { error, success, products, loader, productCounts, resultPerPage, filteredProductCounts } = useSelector(state => state.productReducer)

    const alert = useAlert()
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0);
    const [price, setPrice] = useState([0, 100000])
    const [category, setCategory] = useState("");

    const setCurrentPageNo = (e) => {

        setCurrentPage(e);
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


    let count = filteredProductCounts
    const priceHandler = (e, newprice) => {
        setPrice(newprice)
        console.log(newprice)
    }
    if (error) {

        alert.error(error.error)
    }

    if (success) {
        dispatch(clearMsg())
    }

    useEffect(() => {

        dispatch(getProduct({
            keyword,
            currentPage,
            price,
            category,
            ratings
        }))


    }, [dispatch, keyword, currentPage, price, category, ratings])


    if (loader) {
        return <Loader />
    }

    const categories = [
        {
            name: "Curtain & Drapes"
        },
        {
            name: "Curtain Fabrics"
        },
        {
            name: "Curtain Fabrics"
        },
        {
            name: "Home decoration & Appliance"
        },
        {
            name: "KIds & toy"
        },
        {
            name: "Jewelry & watches"
        },
        {
            name: "CellPhones & Tabs"
        },
        {
            name: "Beauty, Health & Hair"
        }
    ]


    return (
        <>

            <div className='w-full mb-20'>


                <div className='  w-[75%] flex flex-wrap gap-6 mx-auto   justify-center items-center     py-10      gap-y-10  '>
                    {
                        products && products.map((product) => (
                            <Link Link to={`/product/${product._id}`} key={product._id}>
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
                                    <span className='text-orange-600'>${product.price}</span>
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
                        ))
                    }
                </div>
            </div>
            {
                products && categories.map((cat, i) => (
                    <ProductSlider heading={cat.name} key={i} categoryget={cat.name} />
                ))

            }



        </>

    )
}

export default Shop
