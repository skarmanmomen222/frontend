import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


// create product
export const createProduct = createAsyncThunk(
    "createProduct",
    async (newProduct, { rejectWithValue, fulfillWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        try {
            const { data } = await api.post(`/admin/new/product`, newProduct, config)
            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// update product
export const updateProduct = createAsyncThunk(
    "updateProduct",
    async ({myForm, id}, { rejectWithValue, fulfillWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        try {
            console.log(myForm, id, "ksdjfkdsjfdsf")
            const { data } = await api.put(`/admin/product/${id}`, myForm, config)
            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)


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
//  delete product action another file


 
// all orders get
export const allOrders = createAsyncThunk(
    "allOrders",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/orders`, { withCredentials: true })


            return fulfillWithValue(data)
        } catch (error) {
            console.log(error, "d")
            return rejectWithValue(error.response.data)
        }
    }

)


// delete product 
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

// delete order
export const deleteOrder = createAsyncThunk(
    "deleteOrder",
    async (id, { rejectWithValue, fulfillWithValue }) => {

        try {


            const { data } = await api.delete(`/admin/order/${id}`, { withCredentials: true })
            console.log(data.msg)

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
        isUpdate: "",
        userSuc: "",
        error: '',
        loader: false,
        products: [],
        productCounts: "",
        users: '',
        orders: "",
        isDelete: "",
    
 


    },
    reducers: {
        clearError: (state, action) => {
            state.error = ""
            state.success = ""
            state.userSuc = ""
            state.isUpdate = ""
            state.isDelete= ""
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