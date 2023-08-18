import React, { useEffect, useState } from 'react'
import Category from '../Category/Category'
import { Link, useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"
import { clearError, userLogin, userRegister } from '../../store/reducers/userReducer'
import Loader from '../Loader'
const Register = () => {
    const navigate = useNavigate()

    const { loader, success, error, isAuthenticated } = useSelector(state => state.userReducer)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/images/admin.jpg");
    const [avatarPreview, setAvatarPreview] = useState("/images/admin.jpg");



    const userInfo = {
        loginEmail: email,
        loginPassword: password
    }
    const registerHandler = (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(userRegister(myForm));
    }


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("User register sucessfully")
            dispatch(clearError())
            navigate("/login")
        }
    }, [dispatch, success, error])
    if (isAuthenticated) {
        navigate("/")
    }

    return (
        <>


            {
                loader ? <Loader /> :
                    <div className='w-full h-[75vh]   flex justify-center items-center pb-10'>
                        <form onSubmit={registerHandler} encType="multipart/form-data">
                            <div className='w-[250px] sm:w-96  mx-auto  flex flex-col    '>
                                <div className='  w-full border-b border-b-yellow-300'>
                                    <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Create New Account</h1>

                                </div>
                                <p className='py-2 capitalize pb-5 text-gray-500 font-semibold text-xs'>welcome back! sign in to your account</p>
                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h2 className='font-mono text-gray-700  '>Name</h2>
                                        <div>
                                            <input required value={name} onChange={registerDataChange} className='w-full border px-5  py-2 sm:py-3 text-sm font-mono rounded-full border-gray-300' placeholder='Name ' name='name' type="text" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h2 className='font-mono text-gray-700'> Email Address</h2>
                                        <div>
                                            <input required value={email} onChange={registerDataChange} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono rounded-full border-gray-300' placeholder='Email ' name='email' type="email" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <h2 className='font-mono text-gray-600'>Password</h2>
                                        <div>
                                            <input required value={password} onChange={registerDataChange} className='w-full  border px-5 py-2 sm:py-3  text-sm font-mono rounded-full border-gray-300' placeholder='Password ' name='password' type="password" />
                                        </div>
                                    </div>
                                    <div id="registerImage" className='flex w-full gap-x-4'>
                                        <img src={avatarPreview} alt="Avatar Preview" className='w-10 h-10 rounded-full' />
                                        <input required
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div>


                                    <button type='submit' className='w-32 transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono rounded-full   bg-yellow-300'>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}

export default Register
