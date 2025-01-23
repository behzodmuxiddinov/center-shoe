import React from 'react'
import { useFetchProducts } from '../hooks'
import { Outlet, Navigate, useParams } from 'react-router-dom'
import { Preloading } from '../components'

const ProtectedRoute = () => {
    const { id } = useParams()
    const { products, loading } = useFetchProducts()
    let ids = products?.map(item => item.id)
    let fake = ids?.find(item => item === id) 
    if(loading) return <Preloading/>
  return (
    fake === undefined ? <Navigate to='/'/> : <Outlet/>
  )
}

export default ProtectedRoute