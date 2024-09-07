import React from 'react'
import { useTranslation } from 'react-i18next'

const WrongInput = ({ msg }) => {
    const { t } = useTranslation()
  return (
    <div className='p-3 w-full border-[1px] border-red-400 text-red-600 mb-4'>{msg}</div>
  )
}

export default WrongInput