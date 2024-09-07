import React from 'react'
import { useTranslation } from 'react-i18next'

const Success = () => {
    const { t } = useTranslation()
  return (
    <div className='w-full flex justify-center fixed z-50 mt-[50px] animate__animated animate__fadeInDown pointer-events-none'>
      <div className='p-1 bg-white rounded-sm border-green-600 border-[1px] shadow-md text-green-600 text-md md:text-sm font-normal'>{t("success")}</div>
    </div>
  )
}

export default Success