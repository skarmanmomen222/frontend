import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user, loader } = useSelector(state => state.userReducer)
    return (
        <>
            {
                loader ? <Loader /> :
                    <div className='w-full py-2 transition-all duration-100 flex justify-center items-center'>
                        {/* <h1 className='text-start w-[60%] mx-auto cursive text-2xl text-gray-400 font-semibold mb-20 pt-2'>profile</h1> */}
                        <div className='w-[60%] mx-auto flex  gap-x-20 gap-y-5 justify-center  items-center flex-wrap  '>

                            <div className='    flex  flex-col gap-y-3 items-center  '>
                                <div className='w-[200px] h-[200px] md:w-[270px] md:h-[270px]   rounded-full'>
                                    <img className='w-full h-full rounded-full object-fill ring-yellow-300 ring-1 shadow-md' src={user?.avatar?.url ? user.avatar.url : "/images/admin.jpg"} alt="" />
                                </div>
                                <Link to="/me/update">
                                    <button className='w-[200px] md:w-[270x] py-2 font-bold text-white rounded-md bg-yellow-300 '>
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>
                            <div className='  flex flex-col gap-y-12   '>
                                <div>
                                    <p className='font-semibold'>Full Name</p>
                                    <span className='text-sm text-gray-400'>{user?.name}</span>
                                </div>
                                <div>
                                    <p className='font-semibold'>Email</p>
                                    <span className='text-sm text-gray-400'>{user?.email}</span>
                                </div>
                                <div>
                                    <p className='font-semibold'>Joined On</p>
                                    <span className='text-sm text-gray-400'>{String(user?.createdAt).substring(0, 10)}</span>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <button className='w-[280px] py-2 text-white rounded-md bg-gray-700 '>
                                        My Orders
                                    </button>
                                    <Link to="/password/update">
                                        <button className='w-[280px] py-2 text-white rounded-md bg-gray-700 '>
                                            Change Password
                                        </button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default Profile
