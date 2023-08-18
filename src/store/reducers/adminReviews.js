import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



// getProductDetails
export const productList = createAsyncThunk(
    "productList",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/products`, { withCredentials: true })


            return fulfillWithValue(data)
        } catch (error) {
            console.log(error, "d")
            return rejectWithValue(error.response.data)
        }
    }

)


// delete reviews 
export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/admin/product/${id}`, { withCredentials: true })


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)






const adminProductReducer = createSlice({
    name: "adminProductReducer/",
    initialState: {
        success: '',
        error: '',
        loader: false,
        isDelete: "",




    },
    reducers: {
        clearError: (state, action) => {
            state.error = ""
            state.success = ""
            state.isDelete = ""
        },

    },
    extraReducers: {
        // get products
        [productList.pending]: (state) => {
            state.loader = true
        },
        [productList.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [productList.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.loader = false
            state.userSuc = payload.success
            state.products = payload.products
            state.productCounts = payload.productCounts
        },
        // create product
        [createProduct.pending]: (state) => {
            state.loader = true
        },
        [createProduct.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [createProduct.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success

        },
        // delete product
        [deleteProduct.pending]: (state) => {
            state.loader = true
        },
        [deleteProduct.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [deleteProduct.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success

        },
        // delete product
        [updateProduct.pending]: (state) => {
            state.loader = true
        },
        [updateProduct.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [updateProduct.fulfilled]: (state, { payload }) => {
            console.log(payload, "sdfsdfdsf")
            state.loader = false
            state.isUpdate = payload.success

        },

        // all order  

        [allOrders.pending]: (state) => {
            state.loader = true
        },
        [allOrders.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [allOrders.fulfilled]: (state, { payload }) => {

            state.loader = false

            state.orders = payload.orders
            state.totalAmount = payload.totalAmount

        },


        // delete order  
        [deleteOrder.pending]: (state) => {
            state.loader = true
        },
        [deleteOrder.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [deleteOrder.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.isDelete = true

        },





    }
})
export const { clearError } = adminProductReducer.actions
export default adminProductReducer.reducer;