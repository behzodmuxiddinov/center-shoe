import React from 'react'
import { ProductCard, Tabtitle, Button, Preloading, Container, Hero } from '../components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFetchProducts } from '../hooks'
import 'react-lazy-load-image-component/src/effects/blur.css';

const Main = ({ viewed, setViewed, admin }) => {

  const { t } = useTranslation()
  const { loading, products } = useFetchProducts()

  Tabtitle('Sentrobuv')

  return (
    loading === true
     ? <Preloading/>
     :
      <main className='w-full flex flex-col relative z-40'>
        <Hero/>
        <Container>
          <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center my-11 md:my-8'>
              <h2 className='text-3xl md:text-xl font-semibold capitalize'>{t("all")}</h2>
            </div>
            <div className='w-full grid grid-cols-4 gap-y-7 gap-x-4 xl:grid-cols-3 lg:grid-cols-2 temp justify-center'>
              {
                products?.slice(0,12).map(product => {
                  return <ProductCard key={product.id} product={product} viewed={viewed} setViewed={setViewed}/>
                })
              }
            </div>
            <div className='w-full flex justify-center mb-5 mt-11'>
              <Link to={'/catalog'} onClick={() => window.scrollTo(0,0)}>
                <Button text={t("view")}/>
              </Link>
            </div>
            {admin && <Link to={'admin'}>
              <Button className='mb-5' text={t("addProduct")}/>
            </Link>}
          </div>
        </Container>
      </main>
  )
}

export default Main