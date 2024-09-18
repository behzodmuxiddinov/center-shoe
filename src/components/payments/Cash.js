import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { InputMask } from 'primereact/inputmask';
import { showSuccessOrder } from '../../store/StoreReducer';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const Cash = () => {
    const { t } = useTranslation()
    const store = useSelector(state => state.store)
    const state = useSelector(state => state.cartItems)
    const { cartItems } = state
    const { light } = store

    const dispatch = useDispatch()

    const [pending, setPending] = useState(false)
    
    const refreshToken = localStorage?.getItem("refreshToken")

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });
    let products = []
    const onSubmit = async ( data ) => {
        if(cartItems.length > 0){
            for(let i = 0; i < cartItems?.[0].basketItems.length; i++){
                products.push({
                    product_id : cartItems[0].basketItems[i].product_id,
                    count : cartItems[0].basketItems[i].count,
                    size : cartItems[0].basketItems[i].size,
                    color : cartItems[0].basketItems[i].color
                })
            }
        }
        data.products = products

        setPending(true)
        await axios.post("http://13.51.195.13:5000/api/orders/create", data, {
            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })
        .then(res => {
            dispatch(showSuccessOrder())
            setPending(false)
        })
        .catch(err => alert(err))
        reset()
    }

  return (
    <div className='w-full flex flex-col items-start pt-5'>
        <form className='w-full flex flex-col relative' onSubmit={handleSubmit(onSubmit)}>
            <div className='relative w-full'>
                <div className='flex'>
                    <h2 className={`text-2xl sm:text-xl mb-2 font-semibold ${light ? 'text-black' : 'text-white'}`}>{t("delivery")}</h2>
                    <span className='text-sm pb-5 ml-1 font-medium text-red-600'>{t("karshi")}</span> 
                </div>
                <div className='w-full flex justify-between items-start mb-4'>
                    <div className='w-[48%]'>
                        <input 
                        type="text" 
                        id="full_name"
                        {...register("full_name", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("req")
                            },
                        })}
                        placeholder={`${t("fullname")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                        />
                        <p className='text-sm w-full text-start text-red-700'>{errors.name?.message}</p>
                    </div>
                </div>
                <InputMask
                    type="phone" 
                    id="phone_number"
                    mask='+999(99)999 99 99'
                    {...register("phone_number", {
                        required : {
                            value : true,
                            message : t("req")
                        },
                    })}
                    placeholder={`${t("phone")}`} 
                    className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                />
                <p className='text-sm w-full text-start text-red-700'>{errors.number?.message}</p>

                <input 
                    type="text" 
                    id="address"
                    {...register("address", {
                        required : {
                            value : true,
                            message : t("req")
                        }
                    })}
                    placeholder={`${t("address")}`} 
                    className='p-3 mt-4 rounded-md w-full border-[1px] border-gray-300 focus:border-gray-500'
                />
                <p className='text-sm w-full text-start mt-1 text-red-700'>{errors.address?.message}</p>
                <button className={`w-full mt-3 px-5 font-semibold text-xl rounded-md py-2 ${light ? 'bg-black text-white' : 'bg-white text-black'} ${pending && 'opacity-75'}`}>
                    {pending ? <CircularProgress/> : t("order")}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Cash