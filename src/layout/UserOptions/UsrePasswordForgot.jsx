import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/Loader';
import { clearMsg, passwordForget,    } from '../../store/reducers/userProfileUpdatereducer';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
 

const UsrePasswordForgot = () => {

    const { loading, error, success } = useSelector(state => state.userProfileUpdate)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [email, setEmail] = useState("")



    const forget = (e) => {
        e.preventDefault();

        console.log("sdfsdfsdfsdfsdfsdfsdsdsdf" ,email)
        const myForm = new FormData();

        myForm.set("email", email);
         
        dispatch(passwordForget(myForm))
        // navigate("/profile")
    };

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }


        if (success) {
            alert.success(success);
            dispatch(clearMsg())
            // navigate("/")
        }





    }, [dispatch, error, success, loading, alert])
    return (
        <>
            {
                loading ? <Loader /> :
                    <div className='w-full    h-[60vh] flex justify-center items-center  '>

                        <form
                            onSubmit={forget}
                            className={`   duration-150 absolute w-[280px] transition-all `}>
                            <div className="flex flex-col gap-y-6  ">
                            <h2 className='text-center mb-16 text-md text-gray-500 border-b border-b-gray-300 py-3'>Forgot password</h2>
                                <div className="flex w-full items-center relative">
                                    <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200 italic   "
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                               


                                <input type="submit" value="Send"
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

export default UsrePasswordForgot
