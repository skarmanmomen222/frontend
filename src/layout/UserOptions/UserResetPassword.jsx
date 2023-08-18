import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearMsg, passwordReset } from '../../store/reducers/userProfileUpdatereducer'
import Loader from '../../components/Loader'
import { loadUser } from '../../store/reducers/userReducer'

const UserResetPassword = () => {
    const { token } = useParams()
    const { loading, error, success } = useSelector(state => state.userProfileUpdate)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const [password, setPassword] = useState("")
    const [cPassword, setCpassword] = useState("")


    const resetPassword = (e) => {
        e.preventDefault();


        // const myForm = new FormData();


        // myForm.set("password", password);
        // myForm.set("cPassword", cPassword);
        const userinfo = {
            password,
            cPassword
        }


        dispatch(passwordReset({userinfo, token}))
        // navigate("/profile")
    };


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }


        if (success) {
            alert.success("password reset successfully");
            dispatch(clearMsg())
            dispatch(loadUser())
            navigate("/")
        }

    }, [dispatch, error, success, loading, alert])

    return (
        <>

            {
                loading ? <Loader /> :
                    <div className='w-full   h-[70vh] flex justify-center items-center  '>

                        <form

                            onSubmit={resetPassword}
                            className={`   duration-150 absolute w-[280px] transition-all `}>
                            <div className="flex flex-col gap-y-6">

                                <div className="flex w-full items-center relative">
                                    <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200 italic   "
                                        type="password"
                                        placeholder="Password"
                                        required

                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex w-full items-center relative">
                                    <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200 italic   "
                                        type="password"
                                        placeholder="Confirm Password"
                                        required

                                        value={cPassword}
                                        onChange={(e) => setCpassword(e.target.value)}
                                    />
                                </div>


                                <input type="submit" value="Update"
                                    className="w-full bg-orange-600 h-[45px] duration-200  hover:border-orange-600
              hover:text-gray-700 rounded-md text-white font-semibold cursor-pointer box-border hover:bg-transparent hover:border transition-all"
                                />
                            </div>
                        </form>

                    </div>

            }
        </>
    )
}

export default UserResetPassword
