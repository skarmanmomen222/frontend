import React, { useEffect, useState } from 'react'
import "./App"
import Success from "./components/Shipping/Success.jsx"
import 'lightbox.js-react/dist/index.css'
import { Route, BrowserRouter as Router, Routes, Switch, useNavigate } from 'react-router-dom'
import Head from "./components/Head"
import Footer from "./layout/Footer.jsx"
import ProductDetails from './components/product/ProductDetails'
import Nav from './components/Nav'
import Products from './components/ProductsCard'
import LoginSignUp from './components/user/LoginSignUp '

import { useSelector, useDispatch } from 'react-redux'
import UserOption from './layout/UserOptions/UserOption'

import Profile from './layout/UserOptions/Profile'
import { loadUser, } from './store/reducers/userReducer'
import ProtectedRoute from './routes/ProtectedRoute'
import UpdateUserProfile from './layout/UserOptions/UpdateUserProfile'
import UserPasswordUpdate from './layout/UserOptions/UserPasswordUpdate'
import UsrePasswordForgot from "./layout/UserOptions/UsrePasswordForgot.jsx"
import UserResetPassword from './layout/UserOptions/UserResetPassword'
import Cart from './components/cart/Cart'
import Navbar from './layout/Navbar'
import Login from './components/Auth/Login'
import Category from './components/Category/Category'
import Register from './components/Auth/Register'
import ProductSlider from './components/product/ProductSlider'
import CategoryList from './components/Category/CategoryList'
import Laptop from './components/Category/Laptop.jsx'
import Shop from './components/Shop/Shop'
import { getProductsAll } from './store/reducers/productsReducer'
import Slider from './components/Slider'
import ALlcategory from './components/Category/ALlcategory'
import Blog from './components/Blog/Blog'
import Loader from './components/Loader'
import ConfirmOrder from "./components/Shipping/ConfirmOrder"
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Shipping from './components/Shipping/Shipping'

import axios from 'axios'
import Payment from './components/Shipping/Payment'
import MyOrder from './components/Order/MyOrder'
import OrderDetails from './components/Order/OrderDetails'

import Sidebar from './components/Admin/Sidebar'

import Dashboard from './components/Admin/Dashboard'

import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct'
import { clearMsg, productList } from './store/reducers/adminProductlist'
import UpdateProduct from './components/Admin/UpdateProduct'
import AllOrders from './components/Admin/AllOrders'
import AdminOrderDetails from './components/Admin/AdminOrderDetails'
import UserList from './components/Admin/UserList'

import UserUpdate from './components/Admin/UserUpdate'
import ReactWhatsapp from 'react-whatsapp';

const App = () => {
  const dispatch = useDispatch()
  const [stripekey, setStripeApiKey] = useState()



  const { isAuthenticated, user, loader, } = useSelector((state) => state.userReducer)


  const getStripeKey = async () => {

    try {
      const { data } = await axios.get("/api/v1/stripeapikey")
      setStripeApiKey(data.sendStripeApiKey)
      console.log(data.sendStripeApiKey, "aramn")
    } catch (error) {
      console.log(error)
    }

  }



  useEffect(() => {

    dispatch(loadUser())
    dispatch(getProductsAll())


    getStripeKey()


  }, [dispatch,])

  return (
    <>

      {loader ? <Loader /> :
        <>
          <Router>
            {/* <Head isAuthenticated={isAuthenticated} /> */}
            <Navbar />
            {/* {
          isAuthenticated && <UserOption user={user} />
        } */}


            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/' element={<Category />} />
              <Route path='/products/:keyword' element={<Products />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route element={!loader && <ProtectedRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/profile' element={<Profile />} />
                <Route path='/me/update' element={<UpdateUserProfile />} />
                <Route path='/password/update' element={<UserPasswordUpdate />} />

              </Route>

              <Route path='/process/payment' element={<Payment />} />
              <Route path='/forgot/password' element={<UsrePasswordForgot />} />
              <Route path='/password/reset/token/:token' element={<UserResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={isAuthenticated ? <Products /> : <Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/laptop' element={<Laptop />} />
              <Route path='/shipping' element={<Shipping />} />
              <Route path='/categories' element={<ALlcategory />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/myorders' element={<MyOrder />} />
              <Route path='/confirm/order' element={<ConfirmOrder />} />
              <Route path='/order/:id' element={<OrderDetails />} />


              {/* admin routes  */}

              <Route element={!loader && <ProtectedRoute user={user} isAmin={true} isAuthenticated={isAuthenticated} />} >
                <Route path='/admin/dashboard' element={<Dashboard />} />

                <Route path='/admin/products' element={<ProductList />} />
                <Route path='/admin/new/product' element={<NewProduct />} />
                <Route path='/admin/product/:id' element={<UpdateProduct />} />
                <Route path='/admin/orders' element={<AllOrders />} />
                <Route path='/admin/order/:id' element={<AdminOrderDetails />} />
                <Route path='/admin/users' element={<UserList />} />

                <Route path='/admin/user/:id' element={<UserUpdate />} />



              </Route>






              {/* admin routes  */}

            </Routes>

          </Router>
          <ReactWhatsapp number="1-212-736-5000" message="Hello World!!!" />
          <MessengerCustomerChat
            pageId="100095273912136"
            appId="267589975972342"
          // htmlRef="<REF_STRING>"
          />,
          <Footer />
        </>
      }
    </>

  )
}

export default App
