import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedAdmin = ({ admin }) => {
  return admin ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedAdmin