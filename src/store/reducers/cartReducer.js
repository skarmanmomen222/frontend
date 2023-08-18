import { createSlice } from "@reduxjs/toolkit";


// add to cart


const cartReducer = createSlice({
    name: "cartReducer",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo: localStorage.getItem("shippingInfo") ?
            JSON.parse(localStorage.getItem("shippingInfo")) :
            {},



        success: false,
        error: "",
        loading: false,



    },
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload;
            const isItemExist = state.cartItems.find(item => item.product === items.product)
            console.log(isItemExist, "items cart")
            if (isItemExist) {

                state.cartItems = state.cartItems.map(i => i.product === isItemExist.product ? items : i)
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
            else {
                state.cartItems = [...state.cartItems, items]

                // set to cart item local storage
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },

        shippingInfoget: (state, action) => {
            state.shippingInfo = action.payload
            if(state.shippingInfo) {
                localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
            }
         
           
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        }

    },
    extraReducers: {



    }
})
export const { addToCart, removeItemFromCart, shippingInfoget } = cartReducer.actions
export default cartReducer.reducer;