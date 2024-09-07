import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

  const store = useSelector(state => state.cartItems)
  const { cartItems } = store

  return cartItems.length > 0 ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoute