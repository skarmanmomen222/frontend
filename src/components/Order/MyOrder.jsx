import React, { useEffect } from 'react'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import Loader from '../Loader';
import { clearMsg, getMyOrders } from '../../store/reducers/OrderReducer';
const MyOrder = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loader, error, success, myOrders } = useSelector(state => state.newOrder)
 
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {

                return params.row.status === "Delivered"
                    ? "text-green-400"
                    : "text-red-500";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
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
                    <Link key={params.id} to={`/order/${params.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            },



        },
    ];
    const rows = [];

  
    myOrders &&
        myOrders.orders.forEach((item, index) => {
 
            rows.push({
                itemsQty: item.orderItems[0].quantity,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearMsg());
        }

        dispatch(getMyOrders());
    }, [dispatch, alert, error]);


    return (
        <>

            {loader ? <Loader /> :
                <div className='w-[90%] mx-auto'>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>}
        </>

    )
}
export default MyOrder