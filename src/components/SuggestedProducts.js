import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { getProducts } from '../store/ProductSlice'
import Preloading from './Preloading'
import { BASE_URL } from '../api/Base_URL'
import axios from 'axios'

const SuggestedProducts = ({ id }) => {
    const { t } = useTranslation()
    
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
    
    let store = useSelector(state => state.products)

    if(products.data?.products.length == 0){
        return <Preloading/>
    }
    
  return (
    <div className='w-full items-center py-11 flex flex-col'>
        <h2 className='text-4xl md:text-2xl mb-11 sm:text-center'>{t("suggested")}</h2>
        <div className='w-full grid grid-cols-4 gap-y-7 xl:grid-cols-3 lg:grid-cols-2 temp justify-center'>
            {
                products?.sort(() => Math.random() - 0.5).slice(0,4).map(item => (
                    <Link to={`/product/${item.id}`} key={item.id} className='flex flex-col items-center animate__animated animate__zoomIn'>
                        <img 
                            src={`https://api.sentrobuv.uz/${item.productImages[0].image}`}
                            alt={item.name} 
                            className='w-[300px] h-[320px] md:w-[280px] md:h-[300px] sm:w-[110px] sm:h-[130px] mb-3'
                            onMouseOver={e => (e.currentTarget.src = `${item.productImages.length > 1 ? item.productImages[1] : item.productImages[0]}`)}
                            onMouseOut={e => (e.currentTarget.src = item.productImages[0])}
                        />
                        <h3 className='text-md'>{item.name}</h3>
                        <h3 className='text-md'>{t("brand")}:{item.brand}</h3>
                        <h3>{item.price} so'm</h3>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default React.memo(SuggestedProducts)