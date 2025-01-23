import React from 'react'

const WrongInput = ({ msg }) => {
  return (
    <div className='p-3 w-full border-[1px] border-red-400 text-red-600 mb-4'>{msg}</div>
  )
}

export default WrongInput