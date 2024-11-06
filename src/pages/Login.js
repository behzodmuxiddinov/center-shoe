import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import ReactCardFlip from 'react-card-flip'
import { Link, useNavigate } from 'react-router-dom'
import { Tabtitle, Button, WrongInput, Container } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { loginFail, removeLoginFail } from '../store/StoreReducer';
import { sentEmail } from '../store/RecoverySlice'
import { InputMask } from 'primereact/inputmask'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios'
import { BASE_URL } from '../api/Base_URL'

const Login = () => {


    const store = useSelector(state => state.store)
    const store2 = useSelector(state => state.recoveryEmail)
    const { loginfail, light } = store
    const { pending, instruction, token } = store2
    const dispatch = useDispatch()

    const { t } = useTranslation()
    const [recover, setRecover] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate()

    let refreshToken = localStorage.getItem('refreshToken')

    const showrecover = (e) => {
        e.preventDefault()
        setRecover(true)
        dispatch(removeLoginFail())
    }

    const showlogin = (e) => {
        e.preventDefault()
        setRecover(false)
    }
    
    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus,
        setError,
        reset
    } = useForm({
        mode: "onBlur",
    });
    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        reset: reset2
    } = useForm({
        mode: "onBlur",
    });


    const onSubmit = async ( data ) => {
        if(data.password.length < 4 || data.password.length > 20){
            setFocus('password')
            setError('password', {
                type: 'manual',
                message: t("invalid")
              });
        }else{
            try{
                await axios.post(`${BASE_URL}/users/signin`, data)
                .then(res => {
                    localStorage.setItem('refreshToken', res.data.tokens.refreshToken)
                    reset()
                }).then(() => {
                    navigate('/account')
                    window.location.reload()
                })
                .catch(err => dispatch(loginFail()))
            } catch(error){
                console.error(error)
            }
        }
    }

    const onSubmit2 = ( data ) => {
        dispatch(sentEmail(data))
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    Tabtitle('login')

  return (
    <Container>
        <div className='w-full flex justify-center items-center'>
            <div className='relative w-[40%] min-h-screen lg:w-1/2 md:w-[70%] sm:w-[90%] text-center pt-[40px] pb-[80px]'>
                {loginfail ? <WrongInput msg={t("wrong")}/> : null }
                <ReactCardFlip flipDirection='vertical' isFlipped={recover}>
                    <div className='w-full'>
                        <h2 className='text-3xl w-full  tracking-widest capitalize'>{t("login")}</h2>
                        <h3 className='text-xl w-full md:w-full text-center my-4'>{t("enter")}</h3>
                        <form className='w-full flex flex-col' onChange={() => dispatch(removeLoginFail())} onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                type="email" 
                                id="email1"
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
                                id="number1"
                                mask='+999(99)999 99 99'
                                {...register("phone_number", {
                                    required : {
                                        value : true,
                                        message : t("req")
                                    },
                                })}
                                placeholder={`${t("phone")}`} 
                                className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500 mt-4'
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
                                    className='p-3 mt-4 w-full sm:pl-1 border-[1px] border-gray-300 focus:border-gray-500'
                                />
                                {isPasswordVisible 
                                    ? 
                                        <VisibilityIcon onClick={togglePasswordVisibility} className='absolute right-2 top-7 text-sm cursor-pointer sm:scale-75'/> 
                                    : 
                                        <VisibilityOffIcon onClick={togglePasswordVisibility} className='absolute right-2 top-7 text-sm cursor-pointer sm:scale-75'/>
                                }
                            </div>
                            <p className='text-sm w-full text-start mb-4 mt-1 text-red-700'>{errors.password?.message}</p>
                        
                            <button onClick={showrecover} className={`bg-transparent border-none cursor-pointer w-max font-semibold mb-2 ${light ? 'text-gray-600 hover:text-gray-700' : 'text-white'}`}>{t("forget")}</button>
                        
                            <Button text={t("login")}/>
                        </form>
                        <div className='w-full flex justify-center mt-4'>
                            <h3 className='mr-2 text-md text-gray-400'>{t("notexist")}</h3>
                            <Link to='/register'>
                                <button className={`bg-transparent border-none cursor-pointer w-max font-semibold ${light ? 'text-gray-600 hover:text-gray-700' : 'text-white'}`}>{t("create")}</button>
                            </Link>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h2 className='text-3xl w-full  tracking-widest capitalize'>{t("recoverpass")}</h2>
                        <h3 className='text-xl w-full md:w-full text-center my-4'>{t("mail")}</h3>
                        {instruction && <h3 className='text-md w-full md:w-full text-center text-green-700 my-4 p-1 bg-gray-300'>{t("instruction")}</h3>}
                        <form className='w-full flex flex-col' onSubmit={handleSubmit2(onSubmit2)}>
                            <input 
                                type="email" 
                                id="email11"
                                {...register2("email", {
                                    required : {
                                        value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                        message : t("invalid")
                                    },
                                })}
                                placeholder={`${t("email")}`} 
                                className='p-3 w-full border-[1px] border-gray-300 focus:border-gray-500'
                            />
                            <p className='text-sm w-full text-start text-red-700'>{errors2.recoveringemail?.message}</p>

                            <button className='capitalize p-3 w-full border-[1px] border-gray-300 mt-4 bg-gray-600 text-white button_slide slide_right'>{t("recover")}</button>
                        </form>
                        <div className='w-full flex justify-center mt-4'>
                            <button onClick={showlogin} className='bg-transparent capitalize border-none cursor-pointer w-max text-gray-400 hover:text-gray-500'>{t("back")}</button>
                        </div>
                    </div> 
                </ReactCardFlip>
            </div>
        </div>
    </Container>
  )
}

export default Login