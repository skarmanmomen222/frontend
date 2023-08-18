import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import LocalMallIcon from '@mui/icons-material/LocalMall';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Head = ({ isAuthenticated }) => {
    const { cartItems } = useSelector(state => state.cartReducer)
    const categorylistmap = [
        {
            name: "Single panel "
        },
        {
            name: "Panel pair "
        },
        {
            name: "Pinch pleat "
        },
        {
            name: "Goblet pleat "
        }, {
            name: "Pencil pleat "
        },
        {
            name: "Grommet "
        },
        {
            name: "Rod pocket "
        }




    ]
    return (
        <>



            <header>
                <div className='w-[85%] mx-auto  py-3 '>
                    {/* header */}
                    <div className=' flex  justify-between items-center border-b-2 border-b-gray-100 pb-3 '>
                        <div className='text-gray-500 flex gap-3 text-sm  '>
                            <span><InstagramIcon /></span>
                            <span><FacebookIcon /></span>
                            <span><TwitterIcon /></span>
                            <span><YouTubeIcon /></span>

                        </div>
                        <div className='flex w-[30%] mx-auto items-center gap-6 text-sm  '>
                            <p className='flex gap-2'><span><PhoneIcon className='text-red-400 text-sm ' /></span>0185983745</p>
                            <p className='flex gap-2'><span className='text-red-400 text-sm'><EmailIcon /></span>arman@gmail.com</p>
                        </div>
                        <div className='flex gap-2  '>
                            <p className='border-b border-b-red-400 font-bold'>En</p>
                            <p className='text-gray-500'>ID</p>
                        </div>
                    </div>
                    {/* navbar */}
                    <div className='flex justify-between items-center  py-5'>
                        {/* logo */}
                        <div>
                            <h2 className='cursive text-2xl text-red-500 font-semibold'>CurtFashion.com</h2>
                        </div>
                        {/* search */}
                        <div className='w-1/3 flex gap-2 items-center'>
                            <input className="w-full cursive rounded-md px-5 py-[10px] border bg-gray-50 border-none outline-none" type="text" placeholder='Search Here' />
                            <div className='px-4 py-2 bg-red-400 rounded-md cursor-pointer'>
                                <SearchIcon className='text-white' />
                            </div>
                        </div>
                        {/* navlink */}
                        <div className='text-md flex items-center gap-4'>
                            <span className='relative' >
                                <Link to="/cart"  >
                                    <LocalMallIcon className={`text-gray-500 
                              cursor-pointer${cartItems.length < 1 ? "" : " text-red-400"}`} />
                                </Link>
                                <span className='absolute    text-xs text-green-300 font-bold w-2 h-2 rounded-full '>
                                    {cartItems.length}
                                </span>

                            </span>

                            <span><Link><EmailIcon className={`  text-gray-500 cursor-pointer`} /></Link></span>
                        </div>
                        {/* auth btn */}
                        <div className='flex items-center gap-5  '>
                            {
                                isAuthenticated ? "" : <Link to="/login">  <button className=' text-red-400 font-semibold   whitespace-nowrap px-3 py-2 border-b rounded-sm border-b-gray-300'>Sign In</button></Link>
                            }

                            {
                                isAuthenticated ? "" : <Link to="/register"><button className='px-4 py-2  text-white rounded-md bg-red-400 whitespace-nowrap'>Sign Up</button></Link>
                            }


                        </div>
                    </div>

                    {/* category */}
                    {/* <div className='w-3/4 mx-auto flex justify-center items-center py-2'>
                        <nav>
                            <ul className='flex items-center gap-10'>
                                {
                                    categorylistmap && categorylistmap.map((c, i) =>
                                    (
                                        <li key={i} className='whitespace-nowrap font-semibold cursive text-gray-500'>
                                            <span className=''>{c.name}</span>
                                        </li>
                                    )
                                    )
                                }
                            </ul>
                        </nav>
                    </div> */}

                </div>
            </header>



            {/* <div className='  w-3/4 mx-auto   '>
                <Carousel autoPlay={true} interval={2000} transitionTime={500} className=' w-full h-full '>
                    <div className=' '>
                        <img src="/images/c2.jpg" alt="" />
                    </div>
                    <div className=' '>
                        <img src="/images/c2.jpg" alt="" />
                    </div>
                    <div className=' '>
                        <img src="/images/c2.jpg" alt="" />
                    </div>



                </Carousel>
            </div> */}

        </>

    )
}

export default Head
