import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const Preloading = () => {

  const store = useSelector(state => state.store)
  const { light } = store

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <CircularProgress size={40}/>
    </div>
  )
}

export default Preloading