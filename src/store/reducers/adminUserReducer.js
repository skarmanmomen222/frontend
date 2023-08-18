import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// userList
export const userListByAdmin = createAsyncThunk(
    "userListByAdmin",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config =
                { withCredentials: true }
            const { data } = await api.get("/admin/users", config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// getUserDetails
export const getUserDetails = createAsyncThunk(
    "getUserDetails",
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config =
                { withCredentials: true }
            const { data } = await api.get(`/admin/user/${id}`, config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }
)

// user role update
export const userRoleUpdate = createAsyncThunk(
    "userRoleUpdate",
    async ({   myForm, id, }, { rejectWithValue, fulfillWithValue }) => {
        console.log(myForm, id)
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await api.put(`/admin/user/${id}`, myForm, config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// user delete
export const userDelete = createAsyncThunk(
    "userDelete",
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await api.delete(`/admin/user/${id}`, config)


            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)







const adminUserReducer = createSlice({
    name: "adminUserReducer",
    initialState: {
        success: false,
        error: "",
        loading: false,
        isUpdate: "",
        users: "",
        isDelete: "",
        // user: "",
        luseer : ""



    },
    reducers: {
        clearMsg: (state, action) => {
            state.error = ""
            state.success = ""
            state.isDelete = ""
            state.isUpdate = ""
        },
      
    },
    extraReducers: {

        // user list  
        [userListByAdmin.pending]: (state, { payload }) => {
            state.loading = true


        },
        [userListByAdmin.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error


        },
        [userListByAdmin.fulfilled]: (state, { payload }) => {

            state.loading = false
            state.success = payload.msg
            state.users = payload.users

        },

        // user role update
        [userRoleUpdate.pending]: (state, { payload }) => {
            state.loading = true


        },
        [userRoleUpdate.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error


        },
        [userRoleUpdate.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isUpdate = payload.success

        },


        // user  delete
        [userDelete.pending]: (state, { payload }) => {
            state.loading = true


        },
        [userDelete.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error


        },
        [userDelete.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isDelete = payload.msg

        },

        
        // get user details
        [getUserDetails.pending]: (state, { payload }) => {
            state.loading = true


        },
        [getUserDetails.rejected]: (state, { payload }) => {

            state.loading = false
            state.error = payload.error


        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
            state.luseer = payload.user
        

        },




    }
})
export const { clearMsg, isUpdateFalse } = adminUserReducer.actions
export default adminUserReducer.reducer;