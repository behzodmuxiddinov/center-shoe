import React from 'react'
import { useTranslation } from 'react-i18next'
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useSelector } from 'react-redux';
import { Container } from '../components'

const Footer = () => {

  const { t } = useTranslation()
  const store = useSelector(state => state.store)
  const { light } = store

  return (
    <div className={`w-full ${light ? 'bg-gray-100' : 'bg-[#02060d]'}`}>
      <Container>
        <div className='w-full flex items-center justify-end sm:justify-center py-9'>
          <div className='flex flex-col items-start'>
            <div className='flex items-start sm:flex-col mb-5'>
              <h3 className='text-xl min-w-[220px] flex justify-start'>{t("info")}:</h3>
              <div>
                <h3>+99893 525 00 99</h3>
                <h3>+99893 930 60 90</h3>
              </div>
            </div>
            <div className='flex sm:flex-col'>
              <h3 className='text-xl min-w-[220px]'>{t("social")}:</h3>
              <div className='flex'>
                <a href="https://www.instagram.com/sentrobuvisports/?hl=en" target='_blank'>
                  <InstagramIcon className='w-4 h-4 cursor-pointer mx-3 sm:ml-0'/>
                </a>
                <a href="https://t.me/sentrobuvi" target='_blank'>
                  <TelegramIcon className='w-4 h-4 cursor-pointer'/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer