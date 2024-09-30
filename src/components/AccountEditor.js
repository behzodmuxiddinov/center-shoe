import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import Tabtitle from './utiles/Tabtitle'
import { useSelector, useDispatch } from 'react-redux'
import { hideEditor } from '../store/StoreReducer'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button'
import { InputMask } from 'primereact/inputmask'
import { useNavigate } from 'react-router-dom'

const AccountEditor = () => {

    const state = useSelector(state => state.store) 
    const state2 = useSelector(state => state.account)
    const { light, editor } = state
    const { id, lastName, userName, email, phoneNumber } = state2
    const [firstName, setFirstName] = useState(userName)
    const [last_Name, setLast_Name] = useState(lastName)
    const [email1, setEmail1] = useState(email)
    const [number, setNumber] = useState(phoneNumber)

    const refreshToken = localStorage?.getItem("refreshToken")
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const { t } = useTranslation()
    Tabtitle(t("edit"))
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const handleEditor = () => {
        dispatch(hideEditor())
    }

    const onSubmit = async ( data ) => {
        await axios.put(`https://api.sentrobuv.uz/users/update/${id}`, data, {
            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })
        .then(res => {
            alert(t("updated"))
            reset()
            navigate('/')
            dispatch(hideEditor())
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => alert(err))
    }

  return (
    <div className={`${editor ? 'flex' : 'hidden'} w-full justify-center items-center fixed z-50 h-screen pointer-events-none`}>
        <div className={`relative pointer-events-auto w-1/3 xl:w-[60%] h-screen md:w-[70%] sm:w-[90%] text-center pt-[40px] pb-[80px] px-11 md:px-3 overflow-y-scroll ${light ? 'bg-white' : 'bg-gray-800'}`}>   
            <div className='w-full'>
                <div className='w-full flex justify-end'>
                    <CloseIcon className='text-2xl cursor-pointer' onClick={handleEditor}/>
                </div>
                <h2 className='text-3xl w-full  tracking-widest capitalize'>{t("edit")}</h2>
                <h3 className='text-xl w-full md:w-full text-center my-4'>{t("fill")}</h3>
                <form className='w-full flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        id="first_name"
                        {...register("first_name", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("req")
                            },
                        })}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={`${t("firstname")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500'
                    />
                    <p className='text-sm w-full text-start text-red-700'>{errors.name?.message}</p>

                    <input 
                        type="text" 
                        id="last_name"
                        {...register("last_name", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("req")
                            },
                        })}
                        value={last_Name}
                        onChange={(e) => setLast_Name(e.target.value)}
                        placeholder={`${t("lastname")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 my-4'
                    />
                    <p className='text-sm w-full text-start text-red-700'>{errors.lastname?.message}</p>

                    <input 
                        type="email" 
                        id="email"
                        {...register("email", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("invalid")
                            },
                        })}
                        value={email1}
                        onChange={(e) => setEmail1(e.target.value)}
                        placeholder={`${t("email")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500'
                    />
                    <p className='text-sm w-full text-start text-red-700'>{errors.email?.message}</p>

                    <InputMask
                        type="phone" 
                        id="number"
                        mask='+999(99)999 99 99'
                        {...register("phone_number", {
                            required : {
                                value : true,
                                message : t("req")
                            },
                        })}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder={`${t("phone")}`} 
                        className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 my-4'
                    />
                    <p className='text-sm w-full text-start text-red-700'>{errors.number?.message}</p>

                    <Button text={t("edit")}/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AccountEditor