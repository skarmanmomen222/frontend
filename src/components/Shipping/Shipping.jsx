import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shippingInfoget } from '../../store/reducers/cartReducer'
import { useAlert } from 'react-alert'
import { Country, State } from "country-state-city";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {  useNavigate } from 'react-router-dom'
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import PublicIcon from '@mui/icons-material/Public';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import CheckOutSteps from './CheckOutSteps';
const Shipping = () => {
    const dispatch = useDispatch()
    const { shippingInfo } = useSelector(state => state.cartReducer)
    const alert = useAlert();
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingInfo?.address);
    const [city, setCity] = useState(shippingInfo?.city);
    const [state, setState] = useState(shippingInfo?.state);
    const [country, setCountry] = useState(shippingInfo?.country);
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
    const shippingHandler = (e) => {
        e.preventDefault()
        dispatch(shippingInfoget({ address, city, state, country, pinCode, phoneNo }))
        navigate("/confirm/order")
    }


 
    return (
        <div>
            <CheckOutSteps activeStep={0} />
            <div className='w-full     flex justify-center items-center pb-10'>
                <form onSubmit={shippingHandler} encType="multipart/form-data">
                    <div className='w-[250px] sm:w-96  mx-auto  flex flex-col    '>

                        <div className=' mb-5 text-center w-full border-b border-b-yellow-300'>
                            <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Shipping Details</h1>

                        </div>

                        <div className='flex flex-col gap-y-5'>
                            <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <i class="fa-solid fa-house absolute top-2 md:top-[13px] text-gray-500  left-3 "></i>
                                    <input type="text"
                                        placeholder="Address"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <LocationCityIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                    <input type="text"
                                        placeholder="City"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <RoomIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                    <input type="number"
                                        placeholder="Pin Code"
                                        required
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' name='name' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <CallIcon className=' absolute  top-2 md:top-[13px] text-gray-500  left-3 ' />
                                    <input type="number"
                                        placeholder="Phone Number"
                                        required
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <PublicIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />

                                    <select
                                        className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300'
                                        required
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="">Country</option>
                                        {Country &&
                                            Country.getAllCountries().map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {country && (
                                <div className='relative'>
                                    <BabyChangingStationIcon className=' absolute top-2 md:top-[13px] text-gray-500  left-3 ' />
                                    <select
                                        className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300'
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                            {/* <div className='flex flex-col gap-y-2   '>
                                <div className='relative'>
                                    <BabyChangingStationIcon className=' absolute top-[13px] text-gray-500  left-3 ' />
                                    <input required value={address} onChange={registerDataChange} className='w-full px-12 border   py-2 sm:py-3 text-sm font-mono rounded-sm cursive border-gray-300' placeholder='Name ' name='name' type="text" />
                                </div>
                            </div> */}




                            <button type='submit' className='w-full transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono rounded-md   bg-yellow-300'>
                                Continue
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Shipping
