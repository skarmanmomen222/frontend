import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// getProduct
export const getProduct = createAsyncThunk(
    "product/get_product",
    async ({ keyword = "", currentPage = 1, price = [0, 100000], category = "", ratings }, { rejectWithValue, fulfillWithValue }) => {

        try {
            let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            if (category) {
         
                link = `/products?category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            }
            

            const { data } = await api.get(link)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error, "d")
            return rejectWithValue(error.response.data)
        }
    }

)

// getProductDetails
export const getProductDetails = createAsyncThunk(
    "product/get_product_details",
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/product/${id}`, { withCredentials: true })


            return fulfillWithValue(data.product)
        } catch (error) {
     
            return rejectWithValue(error.response.data)
        }
    }

)


 

// all user get 
export const userList = createAsyncThunk(
    "userList",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/users`, { withCredentials: true })


            return fulfillWithValue(data)
        } catch (error) {
            console.log(error, "d")
            return rejectWithValue(error.response.data)
        }
    }

)

const productReducer = createSlice({
    name: "product",
    initialState: {
        success: '',
        error: '',
        loader: false,
        products: [],
        product: {},
        productCounts: "",
        resultPerPage: "",
        filteredProductCounts: 0,
        users: ""

    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
        },
        getproducts: (state, action) => {
            return state.products
        }
    },
    extraReducers: {
        // get products
        [getProduct.pending]: (state) => {
            state.loader = true
        },
        [getProduct.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [getProduct.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.msg
            state.products = payload.products
            state.productCounts = Number(payload.productCounts)
            state.resultPerPage = Number(payload.resultPerPage)
            state.filteredProductCounts = Number(payload.filteredProductCounts)
        },



        // get product details
        [getProductDetails.pending]: (state) => {
            state.loader = true
        },
        [getProductDetails.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [getProductDetails.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.msg
            state.product = payload
        },

        
        // all user get 

        [userList.pending]: (state) => {
            state.loader = true
        },
        [userList.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [userList.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.users = payload.users

        },

    }
})
export const { clearMsg, getproducts } = productReducer.actions
export default productReducer.reducer;