import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
        

const Electron = () => {
    const { t } = useTranslation()
    const store = useSelector(state => state.store)
    const { light } = store

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });
    const onSubmit = ( data ) => {
        console.log(data);
        reset()
    }


  return (
    <div className='w-full flex flex-col items-start pt-5'>
        <form className='w-full flex flex-col relative' onSubmit={handleSubmit(onSubmit)}>
            <div className='relative w-full'>
                <h2 className={`text-2xl sm:text-xl mb-2 font-semibold ${light ? 'text-black' : 'text-white'}`}>{t("delivery")}</h2>
                <div className='w-full flex justify-between items-start mb-4'>
                    <div className='w-[48%]'>
                        <input 
                        type="text" 
                        id="name"
                        {...register("name", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("req")
                            },
                        })}
                        placeholder={`${t("firstname")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                        />
                        <p className='text-sm w-full text-start text-red-700'>{errors.name?.message}</p>
                    </div>
                    <div className='w-[48%]'>
                        <input 
                            type="text" 
                            id="lastname"
                            {...register("lastname", {
                                required : {
                                    value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                    message : t("req")
                                },
                            })}
                            placeholder={`${t("lastname")}`} 
                            className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                        />
                        <p className='text-sm w-full text-start text-red-700'>{errors.lastname?.message}</p>
                    </div>
                </div>
                <InputMask 
                    type="phone" 
                    id="phone"
                    mask='+999(99)999 99 99'
                    {...register("phone", {
                        required : {
                            value : true,
                            message : t("req")
                        },
                    })}
                    placeholder={`${t("phone")}`} 
                    className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                />
                <p className='text-sm w-full text-start text-red-700'>{errors.phone?.message}</p>

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
                    className='p-3 mt-4 rounded-md w-full  border-[1px] border-gray-300 focus:border-gray-500'
                />
                <p className='text-sm w-full text-start mt-1 text-red-700'>{errors.address?.message}</p>
            </div>
            <div className='w-full'>
                <h2 className={`text-2xl sm:text-xl mt-5 mb-2 font-semibold ${light ? 'text-black' : 'text-white'}`}>{t("payment")}</h2>
                <input 
                    type="text" 
                    id="cardname"
                    {...register("cardname", {
                        required : {
                            value : true,
                            message : t("req")
                        }
                    })}
                    placeholder={`${t("cardname")}`} 
                    className='p-3 w-full  border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                />
                <p className='text-sm w-full text-start mb-4 mt-1 text-red-700'>{errors.cardname?.message}</p>

                <InputMask 
                    id="card"
                    mask='9999 9999 9999 9999'
                    {...register("card", {
                        required : {
                            value : true,
                            message : t("invalid")
                        }
                    })}
                    placeholder={`${t("card")}`} 
                    className='p-3 w-full  border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                />
                <p className='text-sm w-full text-start mb-4 mt-1 text-red-700'>{errors.card?.message}</p>

                <InputMask 
                    id="date"
                    mask='99/99'
                    {...register("date", {
                        required : {
                            value : true,
                            message : t("expiration")
                        }
                    })}
                    placeholder={`${t("expire")}`} 
                    className='p-3 w-1/2 sm:w-full  border-[1px] border-gray-300 focus:border-gray-500 rounded-md'
                />
                <p className='text-sm w-full text-start mb-4 mt-1 text-red-700'>{errors.date?.message}</p>
                <button 
                    className={`w-full px-5 font-semibold text-xl rounded-md py-2 ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {t("pay")}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Electron