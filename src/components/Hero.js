import React from 'react'
import { useTranslation } from 'react-i18next'
import hero from '../images/hero4.jpg'
import { Container } from './'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <div className='relative wow animate__animated animate__zoomIn w-full bg-cover bg-no-repeat bg-center h-[450px] md:h-[320px]' style={{ backgroundImage: `url(${hero})` }}>
        <Container>
            <h1 className='absolute z-30 max-w-[700px] md:w-[500px] sm:max-w-[300px] xm:w-[180px] top-11 lg:top-2 md:top-0 sm:top-5 leading-[150%] md:leading-[170%] sm:leading-[160%] xm:leading-[140%] uppercase text-6xl md:text-5xl sm:text-4xl xm:text-3xl text-white'>{t("optimal")}</h1>
        </Container>
    </div>
  )
}

export default Hero