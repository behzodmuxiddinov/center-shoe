import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { closeEditModal } from '../store/StoreReducer';
import { useFetchProduct } from '../hooks';
import { Form } from './'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const EditProduct = () => {
    const dispatch = useDispatch()
    let id = localStorage?.getItem('id')
    const state = useSelector(state => state.store)
    const { editModal } = state

    let { product } = useFetchProduct(id)
    
    return (
        <div className={`w-full animate__animated fixed z-40 flex justify-center pointer-events-none break-words ${editModal ? 'animate__zoomIn' : 'animate__zoomOut'}`}>
            <div className='max-w-[1024px] w-full min-h-screen py-3 flex justify-center relative'>
                {product &&
                    <div className="w-1/2 lg:w-3/4 md:w-full h-max bg-white p-5 sm:p-2 rounded-lg pointer-events-auto">
                        <div onClick={() => dispatch(closeEditModal())} className='mb-2 w-full flex justify-end'>
                            <HighlightOffIcon style={{ fontSize: 30 }} className="cursor-pointer text-gray-500"/>
                        </div>
                        <Form type='edit'/>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditProduct