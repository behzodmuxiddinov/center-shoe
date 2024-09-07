import React from 'react'
import { TwelveDotsScaleRotate } from "react-svg-spinners";
import { useSelector } from 'react-redux';

const Preloading = () => {

  const store = useSelector(state => state.store)
  const { light } = store

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <TwelveDotsScaleRotate width={80} height={80} color={light ? 'black' : 'white'}/>
    </div>
  )
}

export default Preloading