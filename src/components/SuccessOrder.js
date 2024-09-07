import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import Tabtitle from './utiles/Tabtitle'
import { useSelector, useDispatch } from 'react-redux'
import { hideEditor } from '../store/StoreReducer'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { hideSuccessOrder } from '../store/StoreReducer'
import {CheckIcon} from './CheckedIcon'

const SuccessOrder = () => {

    const state = useSelector(state => state.store) 
    const { successOrder, light } = state


    const dispatch = useDispatch()

    const { t } = useTranslation()

    const handleSuccessOrder = () => {
        dispatch(hideSuccessOrder())
    }

  return (
    <div className={`${successOrder ? 'flex' : 'hidden'} w-full justify-center items-center fixed z-50 h-screen pointer-events-none break-words`}>
        <div className={`relative pointer-events-auto w-1/3 xl:w-[60%] h-screen md:w-[70%] sm:w-[100%] text-center pt-[40px] pb-[80px] px-11 md:px-3 overflow-y-scroll ${light ? 'bg-white' : 'bg-gray-800'}`}>   
            <div className='w-full h-[70%] flex flex-col justify-center items-center'>
                <div className='w-full flex justify-end mb-5'>
                    <CloseIcon className='cursor-pointer font-bold' onClick={handleSuccessOrder}/>
                </div>
                <div className='relative'>
                    <div className='w-full flex justify-center'>
                        <div className='bg-green-800 w-max p-3 rounded-full'>
                            <CheckIcon/>
                        </div>
                    </div>
                    <h2 className='text-3xl tracking-widest'>{t("successOrder")}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}


export default SuccessOrder