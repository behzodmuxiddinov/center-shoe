import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Preloading, Tabtitle } from '../components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showEditor } from '../store/StoreReducer'
import { fetchAccount } from '../store/AccountSlice'
import { BASE_URL } from '../api/Base_URL'



const Account = () => {

  const state = useSelector(state => state.account)
  const { loading, userName } = state
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let refreshToken = localStorage?.getItem('refreshToken')

  Tabtitle('account')

  useEffect(() => {
    dispatch(fetchAccount())
  }, [])

  const logout = async () => {
    const request = await fetch(`${BASE_URL}/api/users/logout`, {
      method: "POST",
      headers: {
        Authorization : `Bearer ${refreshToken}`
      }
    })

    localStorage.clear('refreshToken')
    navigate('/')
    window.location.reload()
  }

  const editAcc = () => {
    dispatch(showEditor())
  }

  if(loading){
    return <Preloading/>
  }

  return (
    <div className='w-full flex justify-start px-11 md:px-3'>
      <div className='min-h-screen w-1/2 xl:w-[60%] md:w-[70%] sm:w-[90%] py-11 flex flex-col items-start'>
        <h2 className='text-2xl font-medium mb-4'>{t("welcome")} <span className='capitalize'>{userName}!</span></h2>
        <Button text={t("editacc")} onClick={editAcc}/>
        <button className='capitalize font-medium min-w-[200px] border-[1px] border-gray-300 mt-4 bg-red-700 text-white button_slide slide_right' onClick={logout}>
          <div className="content px-3 py-2">
            <span className="span">
              {t("logout")}
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Account