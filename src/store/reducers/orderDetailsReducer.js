import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const orderInfo = createAsyncThunk(
    "orderInfo/",
    async (id, { rejectWithValue, fulfillWithValue }) => {

        try {


      

            const { data } = await api.get(`/order/${id}`, { withCredentials: true })
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// order status update 
export const orderStatusUpdate = createAsyncThunk(
    "orderStatusUpdate",
    async ({id, myForm}, { rejectWithValue, fulfillWithValue }) => {

        try {


            const { data } = await api.post(`/admin/order/${id}`, myForm, { withCredentials: true })
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)
 

const OrderDetailsReducerInfo = createSlice({
    name: "OrderDetailsReducerInfo",
    initialState: {
        order: "",
        success: "",
        isProcess: "",
        loader: false,
        error: "",


    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
            state.isProcess = ""
        },

    },
    extraReducers: {

        // order details
        [orderInfo.pending]: (state) => {
            state.loader = true
        },
        [orderInfo.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [orderInfo.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.order = payload.order
        },

          // order status update
          [orderStatusUpdate.pending]: (state) => {
            state.loader = true
        },
        [orderStatusUpdate.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [orderStatusUpdate.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.isProcess = payload.success
             
        },


    }
})
export const { clearMsg } = OrderDetailsReducerInfo.actions
export default OrderDetailsReducerInfo.reducer;