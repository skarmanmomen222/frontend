import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const reviewCreate = createAsyncThunk(
    "reviewCreate/",
    async (revieData, { rejectWithValue, fulfillWithValue }) => {

        try {
            const { data } = await api.post(`/review/`, revieData, { withCredentials: true })
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

const reviewReducer = createSlice({
    name: "reviewReducer",
    initialState: {
        review: "",
        success: "",
        loader: false,
        error: "",


    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
        },

    },
    extraReducers: {

        // order details
        [reviewCreate.pending]: (state) => {
            state.loader = true
        },
        [reviewCreate.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error

        },
        [reviewCreate.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.review = payload
        },


    }
})
export const { clearMsg } = reviewReducer.actions
export default reviewReducer.reducer;