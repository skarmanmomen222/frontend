import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// register
export const userRegister = createAsyncThunk(
    "userregister",
    async (userData, { rejectWithValue, fulfillWithValue }) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await api.post("/register", userData, config)
      

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// userLogin
export const userLogin = createAsyncThunk(
    "userlogin",
    async (userInfo, { rejectWithValue, fulfillWithValue }) => {

        try {
      
            const userData = {
                email: userInfo.loginEmail,
                password: userInfo.loginPassword
            }

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await api.post("/login", userData, config)
            console.log(data.msg)

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// load user || get user details
export const loadUser = createAsyncThunk(
    "userload",
    async (_, { rejectWithValue, fulfillWithValue }) => {

        try {

            const { data } = await api.get("/me")
         

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

// user logout
export const userLogout = createAsyncThunk(
    "userLogout",
    async (_, { rejectWithValue, fulfillWithValue }) => {

        try {

            const { data } = await api.get("/logout")
          

            return fulfillWithValue(data)
        } catch (error) {

            return rejectWithValue(error.response.data)
        }
    }

)

 

const userReducers = createSlice({
    name: "userReducer",
    initialState: {
        success: '',
        error: "",
        loader: false,
        user: {},
        isAuthenticated: false,
        isLogout: "",
   


    },
    reducers: {
        clearError: (state, action) => {
            state.error = ""
            state.success = ""
        },
     

    },
    extraReducers: {
        // register 
        [userRegister.pending]: (state) => {
            state.loader = true
            state.isAuthenticated = false
        },
        [userRegister.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error
            state.isAuthenticated = false

        },
        [userRegister.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.user = payload.user
        
        },

        // user login
        [userLogin.pending]: (state) => {
            state.loader = true
       
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loader = false
            state.error = payload.error
            state.isAuthenticated = false

        },
        [userLogin.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.success = payload.success
            state.user = payload.user
            state.isAuthenticated = true
        },

        // laod user || get uesr details
        [loadUser.pending]: (state) => {
            state.loader = true
            state.isAuthenticated = false
        },
        [loadUser.rejected]: (state, { payload }) => {
            state.loader = false
            state.isAuthenticated = false

        },
        [loadUser.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.success = payload.msg
            state.user = payload.user
            state.isAuthenticated = true
        },


        // logout 
        [userLogout.pending]: (state) => {
            state.loader = true
            state.isAuthenticated = false
        },
        [userLogout.rejected]: (state, { payload }) => {
       
            state.loader = false
            state.error = payload.error

            state.isAuthenticated = false

        },
        [userLogout.fulfilled]: (state, { payload }) => {

            state.loader = false
            state.user = null
            state.isAuthenticated = false
        },


         

    }
})
export const { clearError,  } = userReducers.actions
export default userReducers.reducer;