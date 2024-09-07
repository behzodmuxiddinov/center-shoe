import React, { useEffect, useState } from 'react'
import 'animate.css'
import { Checkout } from '../pages';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { hideCart } from '../store/StoreReducer';
import { fetchCartItems } from '../store/CartSlice';
import axios from 'axios';
import { FormattedNumber } from './utiles/FormattedNUmber';

const Cart = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.store)
  const { light, cart } = store 

  const store2 = useSelector(state => state.cartItems)
  const { cartItems } = store2
  let total
  if(cartItems?.length > 0){
    total = cartItems?.[0].basketItems?.filter(item => item !== undefined).map(item => item.price * item.count).reduce((a,b) => a + b, 0)
  }


  let refreshToken = localStorage?.getItem('refreshToken')
  
  useEffect(() => {
    if(refreshToken){
      dispatch(fetchCartItems())
    }
  },[])

  const { t } = useTranslation()
  

  const handleCart = () => {
    dispatch(hideCart())
  }

  const deleteCartItem = async (e) => {
    await axios.delete(`http://13.51.195.13:5000/api/baskets/delete/basket-items/${e.target.id}`,{
      headers : {
        Authorization : `Bearer ${refreshToken}`
      }
    })
    .then(res => {
      dispatch(fetchCartItems())
    })
    .catch(err => console.err(err))
  }


  return (
    <div className={`flex flex-col fixed right-0 z-50 h-screen transition-all duration-1000 justify-between border-l-[1px] border-gray-500 opacity-100 w-[30%] lg:w-1/2 md:w-[65%] sm:w-[90%] ${light ? 'bg-white' : 'bg-black'} ${cart ? 'translate-x-0' : 'translate-x-[100%]'}`}>
      <div className='w-full flex items-center  justify-between p-5 h-[10%] border-b-[1px] border-gray-400'>
        <h2 className='text-2xl  pb-1'>{t("cart")}</h2>
        <CloseIcon className='text-2xl cursor-pointer' onClick={handleCart}/>
      </div>
      { cartItems?.length > 0 && cartItems?.[0].basketItems?.length > 0 ? 
        <div className='flex flex-col justify-between p-5 h-[90%]'>
          <div className='flex flex-col overflow-y-scroll h-[80%]'>
            {
              cartItems[0].basketItems?.map(item => (
                <div key={item.id} className='w-full flex items-center justify-between mb-3 font-semibold'>
                  <img src={`http://13.51.195.13:5000/${item.product.productImages[0].image}`} alt={item.product.name} className='w-[35%] h-[120px]'/>
                  <div className='w-[50%] flex flex-col break-words'>
                    <h3>{item.product.name}</h3>
                    {item.size && item.color && <div className='flex items-center'>
                      <h3 className='my-2 mr-1'>{item.size ? item.size+'/' : null}{item.color && item.color} </h3>
                      <span className={`w-3 h-3 rounded-full border-[1px] border-gray-600 ${item.color}`}></span>
                    </div>}
                    <h3>{item.price} so'm</h3>
                    <h3 className='my-2'>{t("quantity")}: {item.count}</h3>
                    <h3 className='mb-2'>{t("total")}: <FormattedNumber number={item.count*item.price}/></h3>
                    <button onClick={deleteCartItem} id={item.id} className='cursor-pointer border-b-[2px] border-red-700 text-red-700 pb-1 w-max text-start'>{t("remove")}</button>
                  </div>
                </div>
              ))
            }
          </div>
          <Link to='/checkout' onClick={handleCart} element={<Checkout/>}>
            <button className='p-3 w-full flex justify-center items-center border-[1px] border-gray-300 mt-4 bg-gray-600 text-white button_slide slide_right'>
              <h3 className='capitalize'>{t("checkout")}</h3>
              <div className='w-1 h-1 bg-gray-300 rounded-full mx-4'></div>
              <h3>{total} so'm</h3>
            </button>
          </Link>
        </div>
        : <div className='flex justify-center items-center w-full h-[90%] p-3'>
            <h2 className='text-2xl w-full text-center md:text-xl sm:text-lg uppercase'>{t("empty")}</h2>
          </div>
      }
    </div>
  )
}

export default Cart