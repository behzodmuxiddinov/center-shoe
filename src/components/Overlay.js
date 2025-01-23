import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { hideFilter, hideCart } from '../store/StoreReducer';

const Overlay = () => {
    
  const store = useSelector(state => state.store)
  const { cart, filter, editor, editModal } = store 
  const dispatch = useDispatch()

  const handleOverlay = () => {
    dispatch(hideCart())
    dispatch(hideFilter())
  }

  return (
    <div onClick={handleOverlay} className={`w-full fixed z-30 h-screen bg-black opacity-50 ${cart | filter | editor | editModal ? 'flex' : 'hidden'}`}></div>
  )
}

export default Overlay