import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tabtitle, Cash } from '../components'
import { useSelector } from 'react-redux'
import { FormattedNumber } from '../components/utiles/FormattedNUmber'

const Checkout = () => {
    
  const { t } = useTranslation()
  Tabtitle(t("checkout"))

  const store = useSelector(state => state.store)
  const cartStore = useSelector(state => state.cartItems)
  const { light } = store
  const { cartItems } = cartStore
  
  let total = cartItems[0].basketItems?.filter(item => item !== undefined).map(item => item.price * item.count).reduce((a,b) => a + b, 0)



  return (
    <div className='w-full flex md:flex-col-reverse'>
      <div className='h-screen overflow-scroll md:h-max w-[55%] md:w-full flex flex-col items-start pl-11 md:px-3 p-5'>
        <Cash/>
      </div>
      
      <div className={`w-[45%] md:w-full h-screen md:h-max overflow-scroll pr-11 md:p-3 p-5 border-l-[1px] border-gray-500  ${light == true ? 'bg-gray-100' : 'bg-[#141417]'}`}>
        {
          cartItems[0].basketItems.filter(item => item !== undefined).map(item => (
              <div key={item.id} className='flex items-center text-md justify-between mb-5 font-semibold'>
                  <div className='flex items-center'>
                      <div className='relative'>
                        <img src={`http://13.51.195.13:5000/${item.product.productImages[0].image}`} alt={item.name} className='mr-4 w-[80px] h-[80px] sm:w-[50px] sm:h-[50px] rounded-md'/>
                        <div className='absolute rounded-full opacity-70 bg-black w-5 h-5 flex justify-center items-center text-white p-1 text-sm -top-[10px] right-[10px]'></div>
                        <span className='absolute -top-[12px] right-[17px] text-white'>{item.count}</span>
                      </div>
                      <div className='mr-7'>
                        <h3>{item.name}</h3>
                        <h3 className='my-2'>{item.brand}</h3>
                        <div>
                          <h3 className='capitalize'>{item.product.name}</h3>
                          <div className='flex items-center'>
                            {item.size && <h3 className='mr-2'>{item.size}/{item.color}</h3>}
                            <span className={`w-3 h-3 rounded-full border-[1px] border-gray-600 ${item.color}`}></span>
                          </div>
                        </div>
                      </div>
                  </div>
                  <h3><FormattedNumber number={item.price * item.count}/> UZS</h3>
              </div>
          ))
        }
        <div className='w-full mt-7 flex justify-between items-center text-2xl sm:text-lg font-semibold border-t-[1px] border-gray-500'>
          <h2 className='capitalize'>{t("total")}</h2>
          <h2><FormattedNumber number={total}/> UZS</h2>
        </div>
      </div>
    </div>
  )
}

export default Checkout