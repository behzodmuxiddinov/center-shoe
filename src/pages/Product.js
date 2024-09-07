import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FormattedNumber } from '../components/utiles/FormattedNUmber';
import { useTranslation } from 'react-i18next';
import { Tabtitle, SuggestedProducts, Button, Preloading } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { showCart, decreaseQuantity, increaseQuantity } from '../store/StoreReducer';
import { fetchCartItems } from '../store/CartSlice';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { BASE_URL } from '../api/Base_URL'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Product = ({ admin }) => {
  
  
  let refreshToken = localStorage?.getItem('refreshToken')
  const navigate = useNavigate()

  const store = useSelector(state => state.store)
  const store2 = useSelector(state => state.cartItems)
  const { quantity, light } = store 
  const { cartItems } = store2
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const [fetching, setFetching] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [images, setImages] = useState([])
  const [size1, setSize1] = useState(null)
  const [color, setColor] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true)
      try {
        const req = await axios.get(`${BASE_URL}/api/products/${id}`)
        .then(res => {
          setProduct(res.data)
          setImages(res.data.productImages.map(item => item.image))
          setSize1(res.data.size[0])
          setColor(res.data.colors[0]) 
          setFetching(false)
          return res
        })
        .catch(err => alert(err))
      } catch (error) {
        alert(error)
      }
    }

    fetchProduct()
  },[])


  const handleIncrease = () => {
    dispatch(increaseQuantity())
  }

  const handleDecrease = () => {
    dispatch(decreaseQuantity())
  }
  
  const { t } = useTranslation()
  const { id } = useParams()
  


  let { productImages, name, brand, price, size, colors } = product
  

  const changeSize = (e) => {
    setSize1(e.target.value)
  }

  const changeColor = (e) => {
    setColor(e.target.value)
  }
  
  const deleteProduct = async () => {
    setIsPending(true)
    await axios.delete(`${BASE_URL}/api/products/delete/${id}`, {
      headers : {
        Authorization : `Bearer ${refreshToken}`
      }
    })
    .then(res => {
      setIsPending(false)
      navigate('/')
      alert(t("deleted"))
    })
    .catch(err => {
      setIsPending(false)
      alert(err)
    })
  }


  const addToCart = async () => {
    if(!refreshToken){
      alert(t('regist'))
    }else{
      let obj = {
        product_id : id,
        size : size1,
        color : color,
        count : quantity,
        name : name,
        brand : brand,
        image : productImages[0].image
      }
      let sameItems = cartItems?.[0].basketItems?.filter(item => item.size == obj.size && item.color == obj.color && obj.name == item.product.name && obj.brand == item.product.brand)
      if(sameItems.length > 0){
        await axios.put(`${BASE_URL}/api/baskets/update/${sameItems[0].id}`, {
          product_id : sameItems[0].product_id,
          count : obj.count + sameItems[0].count
        },
        {
            headers : {
              Authorization : `Bearer ${refreshToken}`,
              "Content-Type" : "application/json"
            },
          }
        )
        .then(res => {
          dispatch(fetchCartItems())
          dispatch(showCart())
        })
        .catch(err => alert(err))
      }else{
        await axios.post(`${BASE_URL}/api/baskets/create`, obj, {
          headers : {
            Authorization : `Bearer ${refreshToken}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(obj)
        })
        .then(res => {
          dispatch(fetchCartItems())
          dispatch(showCart())
        })
        .catch(err => alert(err))
      }
    }
  }

  Tabtitle(name ? `${name} | ${brand}` : 'Sentrobuvi')

  return (
    fetching == true
      ? 
        <Preloading/>
      :
      <div className='w-full flex flex-col items-center'>
        <div className='3xl:w-[60%] 2xl:w-[70%] xl:w-[90%] lg:w-full flex justify-center lg:flex-col md:items-center md:px-3 py-11'>
          <Swiper
            className='w-[70%] md:w-1/2 sm:w-[80%] h-[600px] md:h-[400px]'
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
                  <img src={`http://13.51.195.13:5000/${item.image}`} className='w-full h-full object-cover' alt={item.image}/>
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
                        className={`border-[1px] w-[30px] h-[30px] mr-2 border-gray-400 ${item} ${item == color ? ' scale-110' : ''}`}
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
              <div className='flex flex-col'>
                  <h2 className='text-lg font-semibold capitalize my-3'>{t("quantity")}:</h2>
                  <div className='flex items-center w-max border-[1px] border-gray-500 text-xl px-4 py-2'>
                    <button onClick={handleDecrease} className={`text-2xl disabled:opacity-35`} disabled={quantity == 1 && true}>-</button>
                    <h3 className='text-xl mx-6'>{quantity}</h3>
                    <button onClick={handleIncrease} className={`text-2xl disabled:opacity-35`} disabled={quantity == 3 && true}>+</button>
                  </div>
              </div>
              <Button text={t("add")} onClick={addToCart}/>            
              {admin && <button onClick={deleteProduct} className={`capitalize font-medium px-3 py-2 w-full mt-4 bg-red-700 text-white ${isPending && 'opacity-75 cursor-not-allowed'}`}>{t("delete")}</button>}
            </div>
          </div>
        </div>
        <SuggestedProducts id={id}/>
      </div>
    
    // <div>fds</div>
  )
}

export default Product