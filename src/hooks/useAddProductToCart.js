import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFetchProduct, useNotify } from "./"
import { useSelector, useDispatch } from "react-redux"
import { BASE_URL } from '../api/Base_URL'
import { showCart } from '../store/StoreReducer'
import { fetchCartItems } from '../store/CartSlice'
import axios from 'axios'

const useAddProductToCart = (id) => {
    const { t } = useTranslation()
    const { notify } = useNotify()
    const dispatch = useDispatch()
    const store = useSelector(state => state.store)
    const store2 = useSelector(state => state.cartItems)
    const { quantity, productUpdated } = store 
    const { cartItems } = store2
    const { product } = useFetchProduct(id, productUpdated)
    const [size1] = useState(null)
    const [color] = useState(null)
    let refreshToken = localStorage?.getItem('refreshToken')

    let { productImages, name, brand } = product || {}

    const addToCart = async () => {
      if(!refreshToken){
        notify(t('regist', "error"))
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
        let sameItems = cartItems?.length > 0 ? cartItems?.[0].basketItems?.filter(item => item.size == obj.size && item.color == obj.color && obj.name == item.product.name && obj.brand == item.product.brand) : []
        if(sameItems?.length > 0){
            await axios.put(`${BASE_URL}/baskets/update/${sameItems[0].id}`, {
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
          .then(_ => {
            dispatch(fetchCartItems())
            dispatch(showCart())
          })
          .catch(err => notify(err.message, "error"))
        }else{
          await axios.post(`${BASE_URL}/baskets/create`, obj, {
            headers : {
              Authorization : `Bearer ${refreshToken}`,
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
          })
          .then(_ => {
            dispatch(fetchCartItems())
            dispatch(showCart())
          })
          .catch(err => notify(err.message, "error"))
        }
      }
    }

  return { addToCart }
}

export default useAddProductToCart