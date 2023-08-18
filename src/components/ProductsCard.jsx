import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SyncIcon from '@mui/icons-material/Sync';
// import { clearMsg, getProduct } from '../store/reducers/d';
import Loader from './Loader';
import { clearMsg, getProduct } from '../store/reducers/productReducers';
import Category from './Category/Category';
import CategoryList from './Category/CategoryList';
import ProductSlider from './product/ProductSlider';
import { addToCart } from '../store/reducers/cartReducer';
import Rating from '@mui/material/Rating';

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

const ProductsCard = () => {
    const { error, success, products, loader, productCounts, resultPerPage, filteredProductCounts } = useSelector(state => state.productReducer)
    const { keyword } = useParams()
    const alert = useAlert()
    const dispatch = useDispatch()

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


    return (

        <>
            {
                loader ?
                    <Loader /> :

                    <div>
                        <div className='w-[90%] mx-auto  '>
                            <div className=' w-full flex   justify-center  gap-x-6   bg-white'>



                                <div className='w-[20%]  hidden lg:block '>
                                    <Category
                                        setRatings={setRatings}
                                        setPrice={setPrice}
                                        setCategory={setCategory}
                                        priceHandler={priceHandler}
                                        price={price}
                                        ratings={ratings}


                                    />

                                </div>



                                {/* grid grid-cols-1 sm:grid-cols-2 md:gap-x-2 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5  */}
                                <div className='w-full items-center justify-center  gap-5 flex flex-wrap py-4    '>
                                    {
                                        products && products.map((product) => (
                                            <Link Link to={`/product/${product._id}`} key={product._id}>
                                                <div className='flex hover:shadow-lg transition-all    group relative overflow-hidden rounded-md shadow-sm shadow-gray-200  w-[220px]   flex-col   px-2 py-6'>
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
                                        ))
                                    }

                                </div>



                            </div>

                            <div className="  w-[10%] mx-auto   px-10 flex justify-center  py-20">
                                {count === 0 ? "" : <Pagination
                                    activePage={currentPage}

                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productCounts}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />}
                            </div>

                        </div>
                        {
                            categories && categories.map((cat, i) => (
                                <ProductSlider heading={cat.name} key={i} categoryget={cat.name} />
                            ))

                        }

                    </div>




            }
        </>
    )

}
{/* <div className='w-[10%] fixed   mx-auto md:absolute md:top-[15vmax] md:left-20   '>
<div className='mb-5'>
    <p className='text-md font-semibold text-gray-600 capitalize'>price</p>
    <Slider
        value={price}

        onChange={priceHandler}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        min={0}
        max={25000}
        size='small'


        disableSwap

    />
</div>
{/* category */}
{/* <div>
    <p className='text-md font-semibold text-gray-600 capitalize'>Category</p>
    <ul>
        {categories && categories.map(category => (
            <li
                className='italic text-md pl-2 pt-1 text-slate-700 cursor-pointer'
                key={category}
                onClick={() => setCategory(category)}
            >
                {category}
            </li>
        ))}
    </ul>
</div> */}

{/* ratings */ }
{/* <div>
    <fieldset className='border border-slate-700 px-6 '>
        <legend>Ratings Above</legend>
        <Slider
            size='small'
            value={ratings}
            min={0}
            max={5}
            valueLabelDisplay='auto'
            onChange={(e, newRatings) => setRatings(newRatings)}
        />
    </fieldset>

</div>

</div>   */}

export default ProductsCard
