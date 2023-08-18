
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader";
import { clearError, userLogin, userRegister } from "../../store/reducers/userReducer";

const LoginSignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, loader, error, success } = useSelector(state => state.userReducer)

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [show, setShow] = useState(false)
    const alert = useAlert()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });


    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/images/admin.jpg");
    const [avatarPreview, setAvatarPreview] = useState("/images/admin.jpg");


    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(userLogin({ loginEmail, loginPassword }))
        // navigate("/")
        // window.location.reload(true)

    }






    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(userRegister(myForm));

    };


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
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("user registered")
            navigate("/")
            dispatch(clearError())

        }

    }, [isAuthenticated, error, success, dispatch])


    return (

        <>
            {

                loader ? <Loader /> :
                    <div className='w-full h-screen bg-[#F2F3F8] absolute'>
                        <div className='w-[380px] h-[70vh] rounded-md overflow-hidden relative  my-20 mx-auto bg-white p-5'>
                            <div className=' '>
                                <div>
                                    <div className="flex h-[2vmax] items-center text-center  ">
                                        <p
                                            onClick={() => setShow(!show)}
                                            className="w-full duration-200 transition-all hover:text-orange-800 cursor-pointer font "  >LOGIN</p>
                                        <p onClick={() => setShow(!show)} className="w-full  transition-all duration-200 font hover:text-orange-800 cursor-pointer"  >REGISTER</p>
                                    </div>
                                    <button className={` w-[50%] h-[3px] transition-all duration-150 border-none bg-orange-600  ${show ? "translate-x-full  " : ""}`} ></button>
                                </div>

                            </div>
                            {/* login form */}
                            <form onSubmit={loginSubmit} className={`  ${show ? "-left-[520px]" : "left-[50px]"} top-[170px] absolute w-[280px] first-line:transition-all duration-150`}>
                                <div className="flex flex-col gap-y-6">
                                    {/* email input */}
                                    <div className="flex w-full items-center relative">
                                        <i class="fa-regular fa-envelope absolute translate-x-4 text-gray-400"></i>
                                        <input
                                            className="focus:border-none px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none border border-gray-200 italic "
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    {/* password input */}
                                    <div className="flex w-full items-center relative">
                                        <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                        <input
                                            className="focus:border-none  px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none border border-gray-200 italic"
                                            type="password"
                                            placeholder="password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>

                                    <Link to="/forgot/password" className="self-end text-xs text-gray-500">Forgot password?</Link>
                                    <input
                                        disabled={loader ? true : false}
                                        type="submit" value="Login"
                                        className="w-full bg-orange-600 h-[45px] duration-200  hover:border-orange-600
                      hover:text-gray-700 rounded-md text-white font-semibold cursor-pointer box-border hover:bg-transparent hover:border transition-all"
                                    />
                                </div>
                            </form>

                            {/* register form */}
                            <form
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                                className={` ${show ? "left-[45px]" : " "} top-[140px]  left-96 duration-150 absolute w-[280px] transition-all `}>
                                <div className="flex flex-col gap-y-6">
                                    <div className="flex w-full items-center relative">
                                        <i class="fa-regular fa-face-smile absolute translate-x-4 text-gray-400"></i>
                                        <input
                                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none border border-gray-200 italic focus:border-none  "
                                            type="text"
                                            placeholder="name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="flex w-full items-center relative">
                                        <i class="fa-regular fa-envelope absolute translate-x-4 text-gray-400"></i>
                                        <input
                                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none border border-gray-200 italic focus:border-none  "
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="flex w-full items-center relative">
                                        <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                        <input
                                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none border border-gray-200 italic"
                                            type="password"
                                            placeholder="password"
                                            required
                                            name="password"
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    {/* <img src={avatar} className="w-[50px] rounded-full h-[50px]" alt="Avatar Preview" /> */}
                                    <div id="registerImage" className="flex gap-2">
                                        <img src={avatarPreview} className="w-[50px] rounded-full h-[50px]" alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <input type="submit" value="Register"
                                        className="w-full bg-orange-600 h-[45px] duration-200  hover:border-orange-600
              hover:text-gray-700 rounded-md text-white font-semibold cursor-pointer box-border hover:bg-transparent hover:border transition-all"
                                    />
                                </div>
                            </form>

                        </div>
                    </div >
            }
        </>

    )
}

export default LoginSignUp 
