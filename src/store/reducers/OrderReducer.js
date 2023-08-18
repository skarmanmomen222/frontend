import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// create order 
export const newOrder = createAsyncThunk(
    "newOrder",
    async (orderData, { rejectWithValue, fulfillWithValue }) => {

        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await api.post("/order/new", orderData, config)
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)
export const getMyOrders = createAsyncThunk(
    "getMyOrders",
    async (_, { rejectWithValue, fulfillWithValue }) => {

        try {


            const { data } = await api.get("/order/me", { withCredentials: true })
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)
 
 



const OrderReducer = createSlice({
    name: "OrderReducer",
    initialState: {
        order: "",
        success: "",
        loader: false,
        myOrders: "",
        error: "",
        orderDetail: "",
        orders: "",
      

    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
         
        },

    },
    extraReducers: {
        // create order 
        [newOrder.pending]: (state) => {
            state.loader = true
        },
        [newOrder.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [newOrder.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.order = payload.order
        },

        // Get order all
        [getMyOrders.pending]: (state) => {
            state.loader = true
        },
        [getMyOrders.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [getMyOrders.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.myOrders = payload
        },
        
       
 





    }
})
export const { clearMsg } = OrderReducer.actions
export default OrderReducer.reducer;