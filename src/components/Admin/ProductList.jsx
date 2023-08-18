import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearError, deleteProduct, productList } from '../../store/reducers/adminProductlist';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import SortIcon from '@mui/icons-material/Sort';
import { useAlert } from 'react-alert';


const ProductList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loader, success, products } = useSelector(state => state.productList)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 240, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 200,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 200,
            type: "number",
            sortable: false,


            renderCell: (params) => {
                return (
                    <div className='flex gap-x-4'>
                        <Link to={`/admin/product/${params.id}`}>
                            <EditIcon className='text-green-500' />
                        </Link>

                        <button
                            onClick={() =>
                                deleteProductHandler(params.id)
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




    products &&
        products.forEach((item, index) => {

            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (success) {
            alert.success("Product Deleted Successfully.")
            dispatch(clearError())
        }
        dispatch(productList())
    }, [dispatch, error, success])
    return (
        <>
                   {loader ? <Loader /> :
            <div className=' w-full   bg-white   mt-20  '>
                <div className='w-full items-center justify-center  bg-white flex flex-col top-36'>
                <div className='w-[90%] mx-auto flex flex-wrap   gap-x-16  md:gap-x-0  gap-y-5       '>


                        <div className='w-full mx-auto md:w-20 '>
                            <Sidebar />
                        </div>







      
                            <div className="md:w-[80%] w-full mx-auto  ">

                                {/* <Box sx={{ height: 600, width: '100%' }}>
                                  
                                </Box> */}

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

export default ProductList
