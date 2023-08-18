import React, { useEffect, useState } from 'react'
import Category from '../Category/Category'
import { Link, useNavigate, useParams, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"
import { clearError, userLogin } from '../../store/reducers/userReducer'
import Loader from '../Loader'

const Login = ( ) => {
    const alert = useAlert()
    const para = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, success, error, isAuthenticated } = useSelector(state => state.userReducer)
    const redirect = "/profile"
   
    if (isAuthenticated) {
        navigate(redirect)
    }


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const userInfo = {
        loginEmail: email,
        loginPassword: password
    }
    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(userInfo))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("User Login Successfully")
            navigate("/")
            
            dispatch(clearError())

        }
    }, [dispatch, success, error])

    return (
        <>

            {loader ? <Loader /> :
                <div className='w-full  h-[60vh]  mt-5 md:mt-2 flex justify-center items-center'>
                    <form onSubmit={loginHandler}>
                        <div className='w-[250px] sm:w-96 mx-auto  flex flex-col    '>

                            <div className='  w-full '>
                                <h1 className='text-xl w-32 font-mono font-semibold border-b-2 text-gray-700 border-b-yellow-300 py-2 '>Sign in</h1>
                            </div>
                            <p className='py-2 capitalize pb-5 text-gray-500 font-semibold text-xs'>welcome back! sign in to your account</p>
                            <div className='flex flex-col gap-y-5'>
                                <div className='flex flex-col gap-y-2  '>
                                    <h2 className='font-mono text-gray-700'> Email Address</h2>
                                    <div>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border px-5 py-2 sm:py-3 text-sm font-mono rounded-full border-gray-300' placeholder='Email ' name='email' type="email" />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                    <h2 className='font-mono text-gray-600'>Password</h2>
                                    <div>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border px-5 py-2 sm:py-3 text-sm font-mono rounded-full border-gray-300' placeholder='Password ' name='password' type="password" />
                                    </div>
                                </div>

                                <span className='text-right text-xs text-gray-500 sm:text-sm cursor-pointer'>
                                    <Link>
                                        Forgotten password?</Link>
                                </span>

                                <button type='submit' className='w-32 transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300  h-9 sm:h-10 px-5 font-bold font-mono rounded-full   bg-yellow-300'>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>}
        </>
    )
}

export default Login
