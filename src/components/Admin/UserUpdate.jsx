import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearMsg, getUserDetails, userRoleUpdate } from '../../store/reducers/adminUserReducer';

const UserUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { user, error, isUpdate, isDelete, loading } = useSelector(state => state.userlist)

    const alert = useAlert()
    const dispatch = useDispatch()


    const [name, setName] = useState()
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");



    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearMsg());
        }
        if (isDelete) {
            alert.success("User delete Successfully");
            dispatch(clearMsg());
            // navigate("/admin/users");

        }

        if (isUpdate) {
            alert.success("User Updated Successfully");
            dispatch(clearMsg());
            navigate("/admin/users");

        }






        dispatch(getUserDetails(id))
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }




    }, [dispatch, alert, error, isUpdate, navigate, id]);

    const updateUserHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);


        dispatch(userRoleUpdate({ myForm, id }));
    };




    return (
        <>
            {loading ? <Loader /> :

                <div className=' w-full   bg-white   mt-16 px-2 '>
                    <div className='w-full items-center justify-center  bg-white flex flex-col '>
                        <div className='w-[90%]  flex-col md:flex-row  flex  justify-between  gap-x-16  md:gap-x-0  gap-y-5     mb-24   '>


                            <div className='   '>
                                <Sidebar />
                            </div>
                            {/* {lo ? <Loader /> : */}
                            <div className='flex-1 flex justify-center items-center mx-auto'>
                                <div className=' h-[75vh] w-80 sm:w-[500px]   pb-10'>
                                    <form onSubmit={updateUserHandler} encType="multipart/form-data">
                                        <div className='  mx-auto  flex flex-col    '>
                                            <div className='  w-full border-b border-b-yellow-300 mb-5'>
                                                <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Update User</h1>

                                            </div>

                                            <div className='flex flex-col gap-y-5'>
                                                <div className='flex flex-col gap-y-2'>
                                                    <div>
                                                        <input
                                                            onChange={(e) => setName(e.target.value)}
                                                            required value={name} className='w-full border px-5  py-2 sm:py-3 text-sm font-mono  border-gray-300 rounded-md' placeholder={"name"} name='name' type="text" />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-y-2'>
                                                    <div>
                                                        <input
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required value={email} className='w-full border px-5  py-2 sm:py-3 text-sm font-mono  border-gray-300  rounded-md' placeholder={"email"} name='email' type="email" />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-y-2'>
                                                    <div>
                                                        <input
                                                            onChange={(e) => setRole(e.target.value)}
                                                            required value={role} className='w-full border px-5  py-2 sm:py-3 text-sm font-mono  border-gray-300  rounded-md' placeholder={"role"} name='role' type="role" />
                                                    </div>
                                                </div>




                                                <button disabled={loading ? true : false} type='submit' className='w-full transition-all duration-400 hover:bg-transparent  rounded-md hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono    bg-yellow-300'>
                                                    {loading ? <span className='cursive'>Loading...</span> : "Update"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* }  */}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserUpdate


