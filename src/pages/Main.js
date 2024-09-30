import React, { useState, useEffect } from 'react'
import { ProductCard, Tabtitle, Button, Preloading, Skeleton } from '../components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import hero from '../images/hero4.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { BASE_URL } from '../api/Base_URL'

const Main = ({ viewed, setViewed, admin }) => {

  const state = useSelector(state => state.products)
  const { loading } = state

  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const req = await axios.get(`${BASE_URL}/products`)
        const res = req
        setProducts(res.data.data.products)
      } catch (error) {
        alert(error)
      }
    }
    fetchProducts()
  },[]);

  const { t } = useTranslation()

  Tabtitle('sentrobuvi')

  return (
    loading == true
     ? <Preloading/>
     :
      <main className='w-full flex flex-col'>
        <div className='relative wow animate__animated animate__zoomIn'>
          <h1 className='w-1/2 md:w-3/4 absolute z-30 left-11 md:left-7 sm:left-2 top-11 lg:top-2 md:top-0 sm:top-5 leading-[150%] md:leading-[140%] sm:leading-[120%]  uppercase text-6xl md:text-5xl sm:text-4xl xm:text-3xl text-white'>{t("optimal")}</h1>
          <LazyLoadImage effect='blur' width='100%' src={hero} alt="" className='w-full h-[450px] md:h-[320px]'/>
        </div>
        <div className='w-full flex flex-col items-center px-11 md:px-2'>
          <div className='w-full flex justify-center my-11 md:my-8'>
            <h2 className='text-3xl md:text-xl font-semibold capitalize'>{t("all")}</h2>
          </div>
          <div className='w-full grid grid-cols-4 gap-y-7 gap-x-2 xl:grid-cols-3 lg:grid-cols-2 temp justify-center'>
            {
              products?.slice(0,8).map(product => {
                return <ProductCard key={product.id} product={product} viewed={viewed} setViewed={setViewed}/>
              })
            }
          </div>
          <div className='w-full flex justify-center my-5'>
            <Link to={'/catalog'} onClick={() => window.scrollTo(0,0)}>
              <Button text={t("view")}/>
            </Link>
          </div>
          {admin && <Link to={'admin'}>
            <Button text={t("addProduct")}/>
          </Link>}
        </div>
      </main>
  )
}

export default Main