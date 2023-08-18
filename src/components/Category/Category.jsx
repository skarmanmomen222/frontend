import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { clearMsg, getProduct, getproducts } from '../../store/reducers/productReducers';
import CategoryList from './CategoryList';
const category = [
    {
        name: "Curtain & Drapes"
    },
    {
        name: "Curtain Fabrics"
    },
    {
        name: "Curtain Accessories"
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


const Category = ({ setRatings, setPrice, setCategory, priceHandler, price, ratings }) => {
    const dispatch = useDispatch()
    const { error, success, products, loader, productCounts, resultPerPage, filteredProductCounts } = useSelector(state => state.productReducer)


   

    const count = filteredProductCounts
    return (
        <div className=' flex   '>
            {/* categorty part */}
            <div className=' w-full mt-2  mb-10'>
                <div className=' bg-white  whitespace-nowrap '>
                    <div className='flex gap-10  justify-between'>
                        <div className='flex flex-col   gap-y-3     w-full pb-5'>
                            <div className='flex items-center  gap-x-3  bg-yellow-300 px-3   py-2 rounded-t-lg '>
                                <span >
                                    <i class="fa-solid fa-bars-staggered text-xs md:text-lg"></i>
                                </span>
                                <span   className='text-gray-600 font-mono font-bold text-xs md:text-[16px]'>
                                    All Categories
                                </span>
                            </div>
                            <div>
                                <ul>
                                    {
                                        category && category.map((c) => (
                                            <Link >
                                                <li onClick={() => setCategory(c.name)} className=' border-b px-3 py-2 transition-all duration-150  hover:border-b-yellow-400' key={c.name}>{c.name}</li>

                                            </Link>))

                                    }

                                </ul>

                            </div>
                            <div className='w-full'>


                                <div className='w-full       '>


                                    {/* slier */}
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

                                    {/* ratings */}
                                    <div>
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

                                </div>
                            </div>
                        </div>





                    </div>

                </div>
            </div>
            {/* <CategoryList setCategory={setCategory} /> */}
        </div>
    )
}

export default Category
