import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useAlert } from 'react-alert';
import { clearMsg, userDelete, userListByAdmin } from '../../store/reducers/adminUserReducer';




const UserList = () => {
    const dispatch = useDispatch()


    const alert = useAlert()

    const { error, loader, users, success, isUpdate, isDelete } = useSelector(state => state.userlist)
    const deleteUserHandler = (id) => {
        dispatch(userDelete(id))
    }
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 240, flex: 0.5 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 250,
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",

            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "name",
            headerName: "Name",

            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,


            renderCell: (params) => {
                return (
                    <div className='flex gap-x-4'>
                        <Link to={`/admin/user/${params.id}`}>
                            <EditIcon className='text-green-500' />
                        </Link>

                        <button
                            onClick={() =>
                                deleteUserHandler(params.id)
                            }
                        >
                            <DeleteIcon className='text-red-600' />
                        </button>
                    </div>
                );
            },



        },
    ];
    const rows = [];




    users &&
        users.forEach((item, index) => {

            rows.push({
                id: item._id,
                email: item.email,
                role: item.role,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearMsg())
        }
        if (isDelete) {
            alert.error("User Deleted Successfully")
            dispatch(clearMsg())
        }

        if (success) {
            alert.success("Product Deleted Successfully.")
            dispatch(clearMsg())
        }
        dispatch(userListByAdmin())
    }, [dispatch, error, success, isDelete])
    return (
        <>

            {loader ? <Loader /> :
                <div className='w-full   bg-white mt-20 '>
                    <div className='w-full items-center justify-center  bg-white flex flex-col'>
                        <div className='w-[90%] mx-auto flex flex-wrap   gap-x-16  md:gap-x-0  gap-y-5       '>
                            <div className='w-full mx-auto md:w-20 '>
                                <Sidebar />
                            </div>


                            <div className="md:w-[80%] w-full mx-auto   ">


                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 9,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />


                            </div>



                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default UserList
