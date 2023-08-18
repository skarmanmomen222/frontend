

import OrderReducer from "./reducers/OrderReducer"
import ProductReviewReducer from "./reducers/ProductReviewReducer"
import adminProductlist from "./reducers/adminProductlist"
import adminUserReducer from "./reducers/adminUserReducer"

import cartReducer from "./reducers/cartReducer"
import orderDetailsReducer from "./reducers/orderDetailsReducer"
import productReducers from "./reducers/productReducers"
import productsReducer from "./reducers/productsReducer"
import userProfileUpdatereducer from "./reducers/userProfileUpdatereducer"
import userReducer from "./reducers/userReducer"


const rootReducer = {
    userReducer: userReducer,
    productReducer: productReducers,
    userProfileUpdate: userProfileUpdatereducer,
    cartReducer: cartReducer,
    products: productsReducer,
    newOrder: OrderReducer,
    orderDetails: orderDetailsReducer,
    review: ProductReviewReducer,
    productList: adminProductlist,
    userlist: adminUserReducer

}

export default rootReducer