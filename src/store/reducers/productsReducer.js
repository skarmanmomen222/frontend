import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// getProduct
export const getProductsAll = createAsyncThunk(
    "products",
    async (_, { rejectWithValue, fulfillWithValue }) => {

        try {


            const { data } = await api.get("/allproducts")

            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error, "d")
            return rejectWithValue(error.response.data)
        }
    }

)


const productsreducer = createSlice({
    name: "productsall",
    initialState: {
        success: '',
        error: '',
        loader: false,
        products: [],

        productCounts: "",


    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
        },

    },
    extraReducers: {
        // get products
        [getProductsAll.pending]: (state) => {
            state.loader = true
        },
        [getProductsAll.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload

        },
        [getProductsAll.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.msg
            state.products = payload.products
            state.productCounts = Number(payload.productCounts)

        },


    }
})
export const { clearMsg } = productsreducer.actions
export default productsreducer.reducer;