import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Tabtitle, Button } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios'
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { BASE_URL } from '../api/Base_URL'

const RecoveryPage = () => {
  const token = useLocation()
  let navigate = useNavigate();
  console.log(token)

  Tabtitle('register')

  const store = useSelector(state => state.store)
  const dispatch = useDispatch()
  const { failed } = store

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);

  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setFocus,
    reset
  } = useForm({
    mode: "onBlur"
  });

  let firstInputValue = watch('newPassword')
  let secondInputValue = watch('confirmNewPassword')

  const editPassword = async (data) => {
    if(data.newPassword.length < 4 || data.newPassword.length > 20 ){
      setFocus('newPassword')
      setError('newPassword', {
        type: 'manual',
        message: t("invalid")
      });
    }else if(firstInputValue !== secondInputValue){
      setFocus("confirmNewPassword")
      setError('confirmNewPassword', {
        type: 'manual',
        message: t("notconfirmed")
      });
    }else{
      await axios.post(`${BASE_URL}/users/forgot-password/${token}`, data)
      .then(res => alert(t("passwordchanged")))
      .catch(err => alert(err))
      reset()
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/3 xl:w-[60%] min-h-screen md:w-[70%] sm:w-[90%] pt-11 text-center'>
        <h2 className='text-3xl w-full tracking-widest capitalize'>{t("recoverpass")}</h2>
        <h3 className='text-xl w-full md:w-full text-center my-4'>{t("newpassword")}</h3>
        <form className='w-full flex flex-col' onSubmit={handleSubmit(editPassword)}>
          <div className='relative'>
            <input 
                type={isPasswordVisible ? 'text' : 'password'} 
                id="newPassword"
                {...register("newPassword", {
                    required : {
                      value : /^[A-Za-z0-9]{4,20}$/,
                      message : t("invalid")
                    },
                })}
                placeholder={`${t("password")}`} 
                className='p-3 sm:pl-1 w-full border-[1px] border-gray-300 focus:border-gray-500'
            />
            {isPasswordVisible 
              ? 
                  <VisibilityIcon onClick={togglePasswordVisibility} className='absolute right-2 top-3 text-sm cursor-pointer'/> 
              : 
                  <VisibilityOffIcon onClick={togglePasswordVisibility} className='absolute right-2 top-3 text-sm cursor-pointer'/>
            }
          </div>
          <p className='text-sm w-full text-start text-red-700'>{errors.newPassword?.message}</p>

          <div className='relative'>
            <input 
              type={isPasswordVisible1 ? 'text' : 'password'}  
              id="confirmNewPassword"
              {...register("confirmNewPassword", {
                  required : {
                    value : /^[A-Za-z0-9]{4,20}$/,
                    message : t("invalid")
                  },
              })}
              placeholder={`${t("confirmpassword")}`} 
              className='p-3 sm:pl-1 w-full border-[1px] border-gray-300 focus:border-gray-500 mt-4'
            />
            {isPasswordVisible1 
              ? 
                <VisibilityIcon onClick={togglePasswordVisibility1} className='absolute right-2 top-7 text-sm cursor-pointer'/> 
              : 
                <VisibilityOffIcon onClick={togglePasswordVisibility1} className='absolute right-2 top-7 text-sm cursor-pointer'/>
            }
          </div>
          <p className='text-sm w-full text-start text-red-700'>{errors.confirmNewPassword?.message}</p>
            
          <Button text={t("recover")}/>
        </form>
      </div>
    </div> 
  )
}

export default RecoveryPage