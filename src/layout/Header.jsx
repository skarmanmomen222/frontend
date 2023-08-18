import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../components/Nav'
import Products from '../components/Products'
import MetaData from './MetaData'
// import { admin_login, clearMsg } from '../../store/reducers/authReducers'
import { clearMsg, getProduct } from '../store/reducers/productReducer'
import {useAlert} from "react-alert"
 
import { Link } from 'react-router-dom'

const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, success, products, loader } = useSelector(state => state.products)
    if (error) {
        console.log("backend error", error)
        alert.error(error)
        dispatch(clearMsg())
    }
    if (success) {
        dispatch(clearMsg())
    }
    useEffect(() => {

        dispatch(getProduct())
      

    }, [dispatch])


    return (
        <> 
        
        
        </>


    )
}

export default Header
