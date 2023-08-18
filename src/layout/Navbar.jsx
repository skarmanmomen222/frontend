import React, { useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CachedIcon from '@mui/icons-material/Cached';
import CategoryList from '../components/Category/CategoryList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import BorderAllIcon from '@mui/icons-material/BorderAll';

import { Link, useNavigate } from 'react-router-dom'
import UserOption from './UserOptions/UserOption';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert"
import { userLogout } from '../store/reducers/userReducer';

const Navbar = () => {
    const [show, setshow] = useState(true)
    const { cartItems } = useSelector(state => state.cartReducer)
    const alert = useAlert()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.userReducer)

    const navigate = useNavigate()
    const [keyword, setKeyword] = useState()

    const seacrhSubmitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/`)
        }

    }

    function logoutUser() {
        dispatch(userLogout());
        alert.success("Logout Successfully");


         navigate("/")



    }
   

    return (
        <>


            <div className='w-full       py-2   '>
                <div className=' bg-white px-10    lg:px-0 lg:w-[90%] mx-auto whitespace-nowrap w-full'>
                    <div className='flex  justify-between    relative  items-center    '>
                        <div className="flex gap-x-10  ]    items-center ">
                            <div className='hidden sm:block'>
                                <div className='flex gap-x-2 items-center   '>
                                    <PhoneIcon className='text-yellow-300 ' />

                                    <span className='text-gray-600  font-mono font-semibold text-sm  ' >098903898204</span>
                                </div>
                            </div>
                            <div className='sm:hidden'>
                                <div className='flex gap-x-2 items-center   '>

                                    <Link to="/" className='cursor-pointer'> <span className='cursive font-semibold text-gray-600'>CurtFashions.com</span></Link>

                                </div>
                            </div>
                            <div className='hidden lg:block'>
                                <div className='flex gap-x-3 items-center '>
                                    <MarkunreadIcon className='text-yellow-300' />
                                    <span >support@gmail.com</span>
                                </div>
                            </div>

                        </div>
                        <div className={` pb-20 md:pb-0    md:px-0   transition-all duration-300 absolute top-40 bg-white z-40 md:relative md:top-0   ${show ? "-translate-x-[200%]" : "translate-x-0 w-full"} md:translate-x-0    `}>
                            <div className={`flex  md:flex-row whitespace-nowrap flex-col    bg-white md:bg-transparent     gap-y-7 gap-x-5    transition-all duration-300      items-center `}>
                                {/* <Link onClick={() => setshow(true)} to="/trackorder" className='flex gap-x-2 items-center  md:flex-row'>
                                    <LocalShippingIcon className='text-yellow-300' />
                                    <span className='text-gray-600  font-semibold text-sm'>Track Order</span>
                                </Link> */}
                                {/* <span className='px-[1px] h-4 bg-gray-200  hidden md:block' ></span> */}

                                {isAuthenticated ? <>
                                    <Link onClick={() => setshow(true)} to="/myorders" className='flex gap-x-2 items-center  md:flex-row' >
                                        <BorderAllIcon className='text-yellow-300' />
                                        <span className='text-gray-600  font-semibold text-sm'>Orders</span>
                                    </Link>
                                    <span className='px-[1px] h-4 bg-gray-200  hidden md:block' ></span>

                                    <Link onClick={() => setshow(true)}  className='flex gap-x-2 items-center  md:flex-row' to="/profile">
                                        <AccountBoxIcon className='text-yellow-300' />
                                        <span className='text-gray-600  font-semibold text-sm'>Profile</span>
                                    </Link>
                                    <Link onClick={logoutUser} to="/logout" className='flex gap-x-2 items-center  md:flex-row'  >
                                        <LogoutIcon className='text-yellow-300' />
                                        <span className='text-gray-600  font-semibold text-sm'>LogOut</span>
                                    </Link>
                                    {
                                        user.role === "admin" && <Link  onClick={() => setshow(true)} to="/admin/dashboard" className='flex gap-x-2 items-center  md:flex-row' >
                                            <DashboardIcon className='text-yellow-300' />
                                            <span className='text-gray-600  font-semibold text-sm'>Dashboard</span>
                                        </Link>
                                    }


                                </> :
                                    <div className='flex gap-x-2 items-center  md:flex-row'>
                                        <PersonIcon className='text-yellow-300' />
                                        <Link to="/register" onClick={() => setshow(true)}>Register</Link>
                                        <span className='text-gray-500'>or</span>
                                        <Link to="/login" onClick={() => setshow(true)}>Login</Link>
                                    </div>
                                }

                            </div>
                        </div>

                        <div className='md:hidden cursor-pointer' onClick={() => setshow(!show)}>
                            <i class="fa-solid fa-bars-staggered"></i>
                        </div>
                    </div>
                </div>
            </div>





            <div className='w-full   py-6 '>
                <div className=' bg-white w-[90%] mx-auto whitespace-nowrap  px-4'>

                    <div className='flex justify-between items-center gap-6'>
                        <div className='hidden md:block'>
                            <div className="flex   justify-between items-center w-[20%] gap-x-4    ">
                                <h1 className='cursive hidden md:block text-xl font-semibold capitalize text-gray-600'>
                                    <Link to="/">
                                        curtfashion.com</Link>
                                </h1>
                                {/* <div className="hidden lg:block">
                                <span className='text-gray-400 '>
                                    <i class="fa-solid fa-bars"></i>
                                </span>
                            </div> */}

                            </div>
                        </div>

                        <div className='w-[45%]  text-xs lg:text-sm  lg:w-[60%] flex relative  items-center  rounded-full h-9 px-2    '  >
                            <form onSubmit={seacrhSubmitHandler}>

                                <div className='w-full  '>
                                    <input onChange={(e) => setKeyword(e.target.value)} className='border-[3px]  py-2 focus:outline-none focus:border-yellow-300  px-5 sm:px-10 cursive border-yellow-300 absolute top-0 left-0 w-full      rounded-full ' type="text" placeholder='Search for product' />
                                </div>
                                <span className='capitalize cursor-pointer hidden lg:block  absolute right-20 top-3 text-xs text-gray-400 font-semibold'>
                                    all categories
                                    <span>
                                        <KeyboardArrowDownIcon className='text-xs' />
                                    </span>
                                </span>
                                <span onClick={seacrhSubmitHandler} className='absolute hidden sm:block top-0 right-0 cursor-pointer   bg-yellow-300 rounded-r-full   px-4 py-[6px] lg:py-2'>
                                    <SearchIcon />
                                </span>
                            </form>
                        </div>

                        <div className='w-[20%] flex items-center  cursor-pointer gap-x-5 justify-end text-gray-600  ' >
                            <span>
                                <CachedIcon />
                            </span>

                            <span>
                                <FavoriteBorderIcon />
                            </span>
                            <span className='relative '>
                              <Link to="/cart">
                              <LocalMallIcon />
                                <span className='w-1 h-1 p-2 bottom-0 right-0 top-3  text-[10px] cursive  font-bold flex items-center justify-center rounded-full absolute bg-yellow-300'>
                                    {cartItems.length}
                                </span>
                                </Link>
                            </span>

                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full  py-3 flex justify-center items-center'>
                <CategoryList />
            </div>

        </>


    )
}

export default Navbar
