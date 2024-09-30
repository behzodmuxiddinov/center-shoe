import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Tabtitle, Button, WrongInput } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { userFail, userSuccess, removeSuccess, removeUserFailed } from '../store/StoreReducer';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { InputMask } from 'primereact/inputmask'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BASE_URL } from '../api/Base_URL'


const Register = () => {
  let navigate = useNavigate();

  Tabtitle('register')
  
  const store = useSelector(state => state.store)
  const dispatch = useDispatch()
  const { failed } = store
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: "onBlur",
  });

    const onSubmit = ( data ) => {
        axios.post(`${BASE_URL}/users/signup`, data)
        .then(res => {
            setTimeout(() => {
                dispatch(userSuccess())
            }, 2000);
            setTimeout(() => {
                dispatch(removeSuccess())
            }, 5000);
            localStorage.setItem('accessToken', res.data.tokens.accessToken)
            localStorage.setItem('refreshToken', res.data.tokens.refreshToken)
            reset()
            navigate('/')
        })
        .catch(res => {
            dispatch(userFail())
        })
    }
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='relative w-1/3 xl:w-[60%] min-h-screen md:w-[70%] sm:w-[90%] text-center pt-[40px] pb-[80px] px-11 md:px-3'>
            {failed ? <WrongInput msg={t("exist")}/> : null }
            <div className='w-full'>
                <h2 className='text-3xl w-full  tracking-widest capitalize'>{t("register")}</h2>
                <h3 className='text-xl w-full md:w-full text-center my-4'>{t("fill")}</h3>
                <form className='w-full flex flex-col' onChange={() => dispatch(removeUserFailed())} onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        id="first_name"
                        {...register("first_name", {
                            required : {
                                value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                message : t("req")
                            },
                        })}
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
                        placeholder={`${t("phone")}`} 
                        className='p-3 sm:pl-1 w-full border-[1px] border-gray-300 focus:border-gray-500 my-4'
                    />
                    <p className='text-sm w-full text-start text-red-700'>{errors.number?.message}</p>

                    <div className='relative'>
                        <input 
                           type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            {...register("password", {
                                required : {
                                    value : /^[A-Za-z0-9]{4,20}$/,
                                    message : t("invalid")
                                }
                            })}
                            placeholder={`${t("password")}`} 
                            className='p-3 w-full sm:pl-1 border-[1px] border-gray-300 focus:border-gray-500'
                        />
                        {isPasswordVisible 
                                ? 
                                    <VisibilityIcon onClick={togglePasswordVisibility} className='absolute right-2 top-3 text-sm cursor-pointer'/> 
                                : 
                                    <VisibilityOffIcon onClick={togglePasswordVisibility} className='absolute right-2 top-3 text-sm cursor-pointer'/>
                            }
                    </div>
                    <p className='text-sm w-full text-start mb-4 mt-1 text-red-700'>{errors.password?.message}</p>

                    <Button text={t("create")}/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register