import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Skeleton from './Skeleton'
import 'animate.css'
import { FormattedNumber } from './utiles/FormattedNUmber'
import { BASE_URL } from '../api/Base_URL'

const ProductCard = ({ product, viewed, setViewed }) => {
  let { t } = useTranslation()
  let { productImages, name, brand, price, id } = product

  const addToViewed = () => {
    if(viewed.length > 4){
      viewed.shift()
      setViewed([...viewed, {
        id : id,
        productImages : productImages,
        name : name,
        brand : brand,
        price : price
      }])
      localStorage.setItem('viewed', JSON.stringify(viewed))
    }else{
      setViewed([...viewed, {
        id : id,
        productImages : productImages,
        name : name,
        brand : brand,
        price : price
      }])
      localStorage.setItem('viewed', JSON.stringify(viewed))
    }
  }


  
  if(productImages.length == 0){
    return <Skeleton/>
  }

  return (
    <Link to={`product/${id}`} onClick={addToViewed} className='text-center flex flex-col items-center wow animate__animated animate__zoomIn font-semibold shadow-lg pb-3'>
        <img 
          src={`${BASE_URL}/${productImages[0].image}`}
          loading='lazy'
          alt={name} 
          className='w-[300px] h-[310px] md:w-[280px] md:h-[300px] sm:w-[110px] sm:h-[130px] mb-3'
          onMouseOver={e => (e.currentTarget.src = `${productImages.length > 1 
            ? 
              `${BASE_URL}/${productImages[1].image}` 
            : 
              `${BASE_URL}/${productImages[0].image}`}`)}
          onMouseOut={e => (e.currentTarget.src = `${BASE_URL}/${productImages[0].image}`)}
        />
        <h3 className='text-md capitalize'>
          {(() => {
            switch (name) {
              case "Polo shirt":
                return t("polo")
              case "Shirt":
                return t("polo")
              case "T-Shirt":
                return t("tshirt")
              case "Moccasin":
                return t("moccasin")
              case "Jeans":
                return t("jeans")
              case "Dvoyka":
                return t("deuce")
              case "Perfume":
                return t("parfum")
              case "Oxford shoes":
                return t("oxford")
              case "Suits":
                return t("suits")
              case "Slippers":
                return t("slippers")
              case "Classic shirt":
                return t("classicshirt")
              case "Sneakers":
                return t("sneakers");
              case "Sweater":
                return t("sweater");
              default :
                return name
            }
          })()}
        </h3>
        <h3 className='text-md capitalize'>{t("brand")}:{brand}</h3>
        <h3><FormattedNumber number={price}/> so'm</h3>
    </Link>
  )
}

export default ProductCard