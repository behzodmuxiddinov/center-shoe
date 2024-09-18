import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import { hideSuccessOrder } from '../store/StoreReducer'
import { FaCheck } from "react-icons/fa";

const SuccessOrder = () => {

    const state = useSelector(state => state.store) 
    const { successOrder, light } = state


    const dispatch = useDispatch()

    const { t } = useTranslation()

    const handleSuccessOrder = () => {
        dispatch(hideSuccessOrder())
    }

  return (
    <div className={`${successOrder ? 'flex' : 'hidden'} animate__animated animate__zoomIn w-full h-screen justify-center items-center fixed z-50 pointer-events-none break-words`}>
        <div className={`relative pointer-events-auto w-1/3 py-9 md:py-3 md:w-[50%] sm:w-[90%] text-center pt-[40px] pb-[80px] px-11 md:px-3 ${light ? 'bg-white' : 'bg-gray-800'}`}>   
            <div className='w-full h-[70%] flex flex-col justify-center items-center'>
                <div className='w-full flex justify-end mb-2'>
                    <CloseIcon className='cursor-pointer font-bold' onClick={handleSuccessOrder}/>
                </div>
                <div className='relative'>
                    <div className='w-full flex justify-center'>
                        <div className='bg-green-800 w-max p-3 rounded-full text-white text-3xl md:text-lg'>
                            <FaCheck />
                        </div>
                    </div>
                    <h2 className='text-3xl md:text-xl tracking-widest'>{t("successOrder")}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}


export default SuccessOrder