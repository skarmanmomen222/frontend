import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate, redirect, Navigate } from 'react-router-dom';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';

import { useAlert } from 'react-alert';
import Loader from '../../components/Loader';
import { loadUser, userLogout } from '../../store/reducers/userReducer';


const UserOption = ({ user }) => {

    const [open, setOpen] = useState()
    const { loader } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const options = [
        { icon: <BorderAllIcon />, name: 'Orders', func: orders },
        { icon: <Person2Icon />, name: 'Profile', func: account },
        { icon: <LogoutIcon />, name: 'Louout', func: logoutUser },

    ];

    if (user?.role === "admin") {

        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/profile")
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(userLogout());
        alert.success("Logout Successfully");


        return navigate("/")



    }
    return (
        <>
            {
                loader ? <Loader /> :
                    <SpeedDial

                        ariaLabel="SpeedDial tooltip example"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        direction='down'
                        className='fixed top-16 right-20    '
                        icon=
                        {
                            <img className='w-full rounded-full h-full shadow-lg border border-orange-500 '
                                src={user?.avatar.url ? user.avatar.url : "/images/admin.jpg"} alt='profile' />
                        }
                    >

                        {options.map((item) => (
                            <SpeedDialAction
                                key={item.name}
                                icon={item.icon}
                                tooltipTitle={item.name}
                                onClick={item.func}
                                tooltipOpen={window.innerWidth <= 600 ? true : false}
                            />
                        ))}


                    </SpeedDial>
            }
        </>



    )
}

export default UserOption
