import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = ({ isAuthenticated, isAdmin, user }) => {


  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  if(isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute
