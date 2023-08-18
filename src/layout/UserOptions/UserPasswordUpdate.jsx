
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/Loader';
import { clearMsg, isUpdateFalse, userPasswordUpdate, userProfleUpdate } from '../../store/reducers/userProfileUpdatereducer';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { loadUser } from '../../store/reducers/userReducer';


const UserPasswordUpdate = () => {
    const { loading, error, success, isUpdate } = useSelector(state => state.userProfileUpdate)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [cPassword, setCpassword] = useState("")


    const updateUserPassword = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("cPassword", cPassword);
        dispatch(userPasswordUpdate(myForm))
        // navigate("/profile")
    };




    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }


        if (success) {
            alert.success("Password Updated Successfully");
            dispatch(clearMsg())
            navigate("/")
        }





    }, [dispatch, error, success, loading, alert])
    return (
        <>

            {
                loading ? <Loader /> :
                    <div className='w-full   h-[70vh] flex justify-center items-center  '>

                        <form

                            onSubmit={updateUserPassword}
                            className={`   duration-150 absolute w-[280px] transition-all `}>
                            <div className="flex flex-col gap-y-6">
                                <div className="flex w-full items-center relative">
                                    <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200 italic   "
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        name="password"
                                        value={oldPassword}
                                        onChange={(e) => setoldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex w-full items-center relative">
                                    <i class="fa-solid fa-lock absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200 italic   "
                                        type="password"
                                        placeholder="New Password"
                                        required

                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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


                                <input type="submit" value="Change Password"
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

export default UserPasswordUpdate
