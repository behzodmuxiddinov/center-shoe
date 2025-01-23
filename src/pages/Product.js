import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormattedNumber } from '../components/utiles/FormattedNUmber';
import { useTranslation } from 'react-i18next';
import { Tabtitle, Button, Preloading, Container } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, openEditModal } from '../store/StoreReducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { useFetchProduct, useDeleteProduct, useAddProductToCart } from '../hooks';
import { BASE_URL } from '../api/Base_URL';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Product = ({ admin }) => {
  const store = useSelector(state => state.store)
  const { quantity, productUpdated } = store 
  const dispatch = useDispatch()
  const [size1, setSize1] = useState(null)
  const [color, setColor] = useState(null)
  const handleIncrease = () => {
    dispatch(increaseQuantity())
  }

  const handleDecrease = () => {
    dispatch(decreaseQuantity())
  }
  
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    localStorage.setItem('id', id)
  }, [id])

  let { product, loading, error } = useFetchProduct(id, productUpdated)
  let { isPending, deleteProduct } = useDeleteProduct()
  let { addToCart } = useAddProductToCart(id)
  
  const changeSize = (e) => {
    setSize1(e.target.value)
  }

  const changeColor = (e) => {
    setColor(e.target.value) 
  }

  if (loading) return <Preloading/>
  if(!product || error) return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className='text-4xl font-semibold'>No data found :( </h1>
    </div>
  )

  let { productImages, name, brand, price, size, colors } = product
  Tabtitle(name ? `${name} | ${brand}` : 'Sentrobuv') 
  
  
  return (
    <Container className='flex flex-col items-center'>
      <div className='w-full flex flex-col items-center min-h-screen 3xl:pt-[100px]'>
        <div className='3xl:w-[60%] 2xl:w-[70%] xl:w-[90%] lg:w-full flex justify-center lg:flex-col md:items-center md:px-3 py-11'>
          <Swiper
            className='w-[70%] md:w-1/2 sm:w-full h-[600px] md:h-[400px]'
            slidesPerView={1}
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            effect='EffectCube'
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {
              productImages?.map(item => (
                <SwiperSlide key={item.image}>
                  <img src={`${BASE_URL}/${item.image}`} className='w-full h-full object-cover' alt={item.image}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className='lg:w-full flex justify-center'>
            <div className='flex flex-col ml-11 lg:w-1/2 md:w-[70%] sm:w-[90%] lg:ml-0 my-5'>
              <h2 className='text-4xl md:text-2xl tracking-widest uppercase'>{name}</h2>
              <h2 className='text-2xl md:text-lg uppercase mt-3'>{brand}</h2>
              <h3 className='text-lg my-3 font-semibold'><FormattedNumber number={price}/> so'm</h3>
              {colors?.length > 0 && <div>
                <h2 className='text-lg font-semibold capitalize mb-3'>{t("color")}:</h2>
                <div className='flex'>
                  {
                    colors.map(item => (
                      <button 
                        key={item}
                        value={item} 
                        onClick={changeColor} 
                        className={`border-[1px] w-[30px] h-[30px] mr-2 border-gray-400 ${item} ${item === color ? ' scale-110' : ''}`}
                      >
                      </button>
                    ))
                  }
                </div>
              </div>}
              {size?.length > 0 && <div className='mt-3'>
                <h2 className='text-lg font-semibold capitalize mb-3'>{t("size")}:</h2>
                <select 
                  name="size selection" 
                  value={size1}
                  onChange={changeSize}
                  className='p-1 border-[1px] border-gray-500 text-black outline-none'
                >
                  {
                    size.map(item => (
                      <option key={item} value={item.size}>{item}</option>
                    ))
                  }
                </select>
              </div>}
              <div className='flex flex-col mb-2'>
                  <h2 className='text-lg font-semibold capitalize my-3'>{t("quantity")}:</h2>
                  <div className='flex items-center w-max border-[1px] border-gray-500 text-xl px-4 py-2'>
                    <button onClick={handleDecrease} className={`text-2xl disabled:opacity-35`} disabled={quantity === 1 && true}>-</button>
                    <h3 className='text-xl mx-6'>{quantity}</h3>
                    <button onClick={handleIncrease} className={`text-2xl disabled:opacity-35`} disabled={quantity === 3 && true}>+</button>
                  </div>
              </div>
              <Button text={t("add")} onClick={addToCart} className={'bg-gray-600'}/>            
              {admin && <Button onClick={() => deleteProduct(id)} className={`my-4 bg-red-600 ${isPending && 'opacity-75 cursor-not-allowed'}`} text={t("delete")}/>}
              {admin && <Button onClick={() => dispatch(openEditModal())} className="bg-green-600" text={t("edit")}/>}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Product