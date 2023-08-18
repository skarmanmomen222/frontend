import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReviewCard from "../product/ReviewCard"
import { useAlert } from 'react-alert';
import Loader from '../Loader';
import { getProductDetails } from '../../store/reducers/productReducers';
import { addToCart } from '../../store/reducers/cartReducer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import { clearMsg, reviewCreate } from '../../store/reducers/ProductReviewReducer';
import Rating from '@mui/material/Rating';
const ProductDetails = () => {

    const { id } = useParams()
    const { error, loader, product } = useSelector(state => state.productReducer)
    const { error: reviewError, success, } = useSelector(state => state.review)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(product.ratings);

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(value);
    const [comment, setComment] = useState("");


    // 
    const increaseQuantity = () => {
        if (product.stock <= quantity) return
        let qty = quantity + 1
        setQuantity(qty)
    }
    const decreseQuantity = () => {
        if (1 >= quantity) return
        let qty = quantity - 1
        setQuantity(qty)
    }
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(reviewCreate(myForm));

        setOpen(false);
    };

    const add_To_Cart = () => {

        console.log("add")
        dispatch(addToCart({
            product: id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            quantity
        }))

        alert.success("items add to cart")
        // // set to cart item local storage
        // localStorage.setItem("cartItems", JSON.stringify())
    }




    useEffect(() => {



        if (error) {

            alert.error(error)
            dispatch(clearMsg())
        }
        if (success) {

            alert.success("review created successfully")
            dispatch(clearMsg())
        }
        dispatch(getProductDetails(id))

    }, [dispatch, error, success, reviewError])
    return (
        <>
            {
                loader ?
                    <Loader />
                    : <div className='w-full pb-4 '>
                        <div className='flex justify-evenly flex-col items-center lg:items-start  text-center lg:text-start lg:flex-row  w-3/4 mx-auto   py-14 px-5   '>
                            <div className=' lg:w-[40%] w-full  md:w-[50vmax]    '>
                                <Carousel className=''>
                                    {product.images && product.images.map((img, i) => (<div className='h-[55vh]'>
                                        <img src={img.url} key={i}  className='w-full h-full  rounded-md   object-cover object-center'/>
                                    </div>))}
                                </Carousel>
                            </div>
                            <div className='  lg:w-[30%] w-full'>
                                <div className='flex flex-col gap-y-1 border-b border-b-gray-400 py-2'>
                                    <span className='text-xl font-bold text-gray-700'>{product.name}</span>
                                    <span className='text-sm text-gray-400'>product # <span>{product._id}</span></span>
                                </div>
                                <div className='flex items-center justify-center lg:justify-start gap-2 border-b border-b-gray-400 py-3'>


                                    <Rating name="size-small" defaultValue={value} size="small" />
                                    <span className='text-xs text-gray-500'>(${product.numOfReviews} reviews)</span>
                                </div>
                                <p className='text-2xl text-red-400 font-bold py-4'>{product.price} د.إ</p>
                                <div className='pt-2 pb-7 flex flex-col lg:flex-row items-center md:text-start gap-2 border-b border-b-gray-400 '>
                                    <div className='flex text-white bg-white border '>
                                        <button onClick={decreseQuantity} className='px-3 py-1 bg-gray-700'>-</button>
                                        <span className='px-3 py-1 text-slate-900'>{quantity}</span>
                                        <button onClick={increaseQuantity} className='px-3 py-1 bg-gray-700'>+</button>
                                    </div>
                                    <button
                                        onClick={add_To_Cart}
                                        disabled={product.stock < 1 ? true : false}
                                        className='hover:scale-[0.9] transform  transition-all duration-300 px-8 py-1 rounded-2xl text-white bg-orange-600 whitespace-nowrap'>Add to cart</button>
                                </div>
                                <div className='py-3 border-b border-b-gray-400 '>
                                    <p className='text-lg text-gray-700 font-semibold capitalize'>
                                        status: <span className={product.stock < 1 ? "text-red-600" : "text-green-600  "}>{product.stock < 1 ? "OutOfStock" : "InStock"}</span>
                                    </p>
                                </div>
                                {/* <div className='py-4 flex flex-col'>
                                    <span className='font-bold text-gray-800'>Description:</span>
                                    <span>{product.description}</span>
                                </div> */}
                                <div className='py-6'>
                                    <button onClick={submitReviewToggle}
                                        className='  transform  transition-all duration-300 px-8 py-1 rounded-2xl text-white bg-orange-600'>Submit Review</button>
                                </div>
                            </div>
                        </div>

                        <div className='py-4 flex flex-col w-[70%] mx-auto'>
                            <span className='font-bold  text-green-500'>Description:</span>
                            <span>{product.description}</span>
                        </div>

                        {/* reviews heading */}
                        <div className='w-full '>
                            <div className='w-[20%] mx-auto border-b-2 border-b-slate-900 text-center py-2 '>
                                <p className='text-md  font-bold text-gray-800'>Reviews</p>
                            </div>
                        </div>
                        <Dialog
                            className=''
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="flex  flex-col">
                                {/* <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                /> */}
                                <Rating name="size-small" defaultValue={value} onChange={(event, newValue) => {
                                    setValue(newValue); setRating(newValue)
                                }} size="small" />

                                <textarea
                                    className=" "
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* reviews cart */}
                        <div className=''>
                            {
                                product.reviews && product.reviews[0] ? (
                                    <div className='overflow-x-auto flex flex-col scroll-m-3 scro'>
                                        {
                                            product.reviews && product.reviews.map((review, i) => (
                                                <ReviewCard review={review} key={i} />
                                            ))
                                        }




                                    </div>
                                ) : <h1 className='text-center text-gray-800 italic font-bold'>No Reviews Yet</h1>
                            }
                        </div>
                    </div>
            }
        </>


    )
}

export default ProductDetails
