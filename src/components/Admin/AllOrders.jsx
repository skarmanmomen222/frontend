import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { allOrders, clearError, deleteOrder, deleteProduct, productList } from '../../store/reducers/adminProductlist';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';

import { useAlert } from 'react-alert';
// import { clearMsg, deleteOrder } from '../../store/reducers/OrderReducer';


const AllOrders = () => {
    const dispatch = useDispatch()
    const alert = useAlert()


    // const { error: dError, success: dSuccess, loader: dLoader } = useSelector(state => state.productReducer)
    const { loader, error, orders, isDelete } = useSelector(state => state.productList)


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 240, flex: 0.5 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "Items Quantity",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
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
                        <Link to={`/admin/order/${params.id}`}>
                            <EditIcon className='text-green-500' />
                        </Link>

                        <button
                            onClick={() =>
                                deleteOrderHandler(params.id)
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




    orders &&
        orders.forEach((order, index) => {
            // let quantity = ""
            // order.orderItems.forEach((q,i) => {
            //     quantity = q.quantity
            // })

            rows.push({
                id: order._id,
                status: order.orderStatus,
                quantity: order.orderItems.length,
                amount: order.totalPrice,
            });
        });

    useEffect(() => {


        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isDelete) {
            alert.success("Order Deleted Successfully")
            dispatch(clearError())
        }
        dispatch(allOrders())

    }, [dispatch, error, isDelete,])
    return (
        <>
            {loader ? <Loader /> :
                <div className='w-full   bg-white mt-20   '>
                    <div className='w-full items-center justify-center  bg-white flex flex-col '>
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

export default AllOrders
