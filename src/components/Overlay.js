import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { hideFilter, hideCart, hideEditor, hideSuccessOrder, openEditModal, closeEditModal } from '../store/StoreReducer';

const Overlay = () => {
    
  const store = useSelector(state => state.store)
  const { cart, filter, editor, successOrder, editModal } = store 
  const dispatch = useDispatch()

  const handleOverlay = () => {
    dispatch(hideCart())
    dispatch(hideFilter())
    dispatch(hideEditor())
    dispatch(hideSuccessOrder())
    dispatch(openEditModal())
    dispatch(closeEditModal())
  }

  return (
    <div onClick={handleOverlay} className={`w-full fixed z-40 h-screen bg-black opacity-50 ${cart | filter | editor | successOrder | editModal ? 'flex' : 'hidden'}`}></div>
  )
}

export default Overlay