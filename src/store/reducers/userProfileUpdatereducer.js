import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// userProfleUpdate
export const userProfleUpdate = createAsyncThunk(
    "userProfleUpdate",
    async (userData, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await api.put("/me/update", userData, config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// userProfleUpdate
export const userPasswordUpdate = createAsyncThunk(
    "userPasswordUpdate",
    async (userData, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await api.put("/password/update", userData, config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// user password forgot
export const passwordForget = createAsyncThunk(
    "passwordForget",
    async (userData, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await api.post("/password/forgot", userData, config)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// user password reset token
export const passwordReset = createAsyncThunk(
    "passwordReset",
    async ({userinfo, token}, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            
            }
            console.log(userinfo)
          

            const { data } = await api.put(`password/reset/token/${token}`, userinfo, config)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)



const userUpdateReducer = createSlice({
    name: "userUpdateReducer",
    initialState: {
        success: false,
        error: "",
        loading: false,
        isUpdate: "",



    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
        },
        isUpdateFalse: (state, action) => {
            state.isUpdate = action.payload
        }

    },
    extraReducers: {

        // update user profile
        [userProfleUpdate.pending]: (state, { payload }) => {
            state.loading = true


        },
        [userProfleUpdate.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error


        },
        [userProfleUpdate.fulfilled]: (state, { payload }) => {

            state.loading = false
            state.success = payload.msg
            state.user = payload.user
            state.isUpdate = false
        },

        // update user password 
        [userPasswordUpdate.pending]: (state, { payload }) => {
            state.loading = true
        },
        [userPasswordUpdate.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error

        },
        [userPasswordUpdate.fulfilled]: (state, { payload }) => {

            state.loading = false
            state.success = payload.success
            state.user = payload.user

        },


        // user password forget
        [passwordForget.pending]: (state) => {
            state.loading = true

        },
        [passwordForget.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload.error


        },
        [passwordForget.fulfilled]: (state, { payload }) => {

            state.loading = false
            state.success = payload.msg
            state.user = payload.user

        },

        // user reset password token
        [passwordReset.pending]: (state) => {
            state.loading = true

        },
        [passwordReset.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload.error


        },
        [passwordReset.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.loading = false
            state.success = payload.success


        },



    }
})
export const { clearMsg, isUpdateFalse } = userUpdateReducer.actions
export default userUpdateReducer.reducer;