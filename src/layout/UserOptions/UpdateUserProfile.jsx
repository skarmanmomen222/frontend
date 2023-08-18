import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/Loader';
import { clearMsg, isUpdateFalse, userProfleUpdate } from '../../store/reducers/userProfileUpdatereducer';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { loadUser } from '../../store/reducers/userReducer';


const UpdateUserProfile = () => {
    const { loading, error, success, isUpdate } = useSelector(state => state.userProfileUpdate)
    const { user } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("/images/admin.jpg");
    const [avatarPreview, setAvatarPreview] = useState("/images/admin.jpg");




    const updateUsersubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(userProfleUpdate(myForm))
        // navigate("/profile")
    };


    const userUpdateAvatar = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url);
        }
        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }
        if (success) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser())
            navigate("/profile")
            dispatch(clearMsg())
            // dispatch(isUpdateFalse(false))
             
        }


    }, [dispatch, alert, error, success, isUpdate, user, isUpdateFalse])
    return (
        <>

            {
                loading ? <Loader /> :
                    <div className='w-full   h-[70vh] flex justify-center items-center  '>

                        <form
                            encType="multipart/form-data"
                            onSubmit={updateUsersubmit}
                            className={`   duration-150 absolute w-[280px] transition-all `}>
                            <div className="flex flex-col gap-y-6">
                                <div className="flex w-full items-center relative">
                                    <i class="fa-regular fa-face-smile absolute translate-x-4 text-gray-400"></i>
                                    <input
                                        className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border outline-none  border border-gray-200  italic   "
                                        type="text"
                                        placeholder="name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="registerImage" className="flex gap-2">
                                    <img src={avatarPreview} className="w-[50px] rounded-full h-[50px]" alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={userUpdateAvatar}
                                    />
                                </div>

                                <input type="submit" value="Update Profile"
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

export default UpdateUserProfile
