import React, { useState, useEffect } from 'react';
import { ProductCard, Preloading } from '../components';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../store/StoreReducer';
import axios from 'axios';
import { BASE_URL } from '../api/Base_URL'
import Tabtitle from '../components';

const Catalog = ({ filterby, viewed, setViewed }) => {
  
  const store = useSelector(state => state.store)
  const { light } = store 
  const dispatch = useDispatch()

  const state = useSelector(state => state.products)
  const { loading } = state

  const [currentItems, setCurrentItems] = useState([])
  const [products, setProducts] = useState([])
  const [itemOffset, setItemOffset] = useState(24);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 8
  const endOffset = itemOffset + itemsPerPage;
  useEffect(() => {
    const fetchProducts = async () => {
      const req = await axios.get(`${BASE_URL}/products`)
      .then(res => {
        setProducts(res.data.data.products)
        setCurrentItems(res.data.data.products)
      })
      .catch(error => alert(error))
    }
    fetchProducts()
  },[]);

  const handleFilter = () => {
    dispatch(toggleFilter())
  }
  
  const { t } = useTranslation()

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products?.length;
    setItemOffset(newOffset);
    localStorage.setItem('newOffset',newOffset)
  };

  useEffect(() => {
    if(!products.length) return;
      setCurrentItems(filterby.length > 0 ? products?.data?.products?.filter(item => item.name == filterby).slice(itemOffset, endOffset) : products?.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(filterby.length > 0 ? products?.filter(item => item.name == filterby).length / itemsPerPage : products?.length / itemsPerPage))
      window.scrollTo(0,0)
  }, [itemOffset, itemsPerPage, products, filterby])

  useEffect(() => {
    setItemOffset(0)
  },[filterby])


  return (
    loading == true
      ? <Preloading/>
      :
    <div className='w-full py-11 md:py-2 relative'>
      <div className={`${filterby.length !== 0 && products?.filter(item => item.name == filterby).length == 0 ? 'flex' : 'grid grid-cols-4 gap-y-7 xl:grid-cols-3 lg:grid-cols-2'}`}>
        {
          filterby.length == 0
          ? products?.slice(itemOffset, endOffset).map(product => (
            <ProductCard key={product.id} product={product} viewed={viewed} setViewed={setViewed}/>
          ))
          : 
          products?.filter(item => item.name == filterby).length > 0
            ? products.filter(item => item.name == filterby).slice(itemOffset, endOffset).map(product => (
              <ProductCard key={product.id} product={product} viewed={viewed} setViewed={setViewed}/>
            ))
            :
            <div className='w-full min-h-[350px] md:min-h-[250px] flex justify-center items-center text-center'>
              <h2 className='text-3xl lg:text-2xl md:text-xl font-semibold'>
                {t("nomatches")}
              </h2>
            </div>  
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowForwardIosIcon/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<ArrowBackIosNewIcon/>}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='link'
        nextLinkClassName='link'
        activeLinkClassName='active'
      />
      <div className={`w-full flex justify-end border-y-[1px] border-gray-500 sticky bottom-0 ${light ? 'bg-white' : 'bg-black'}`}>
        <button className='py-4 px-11 border-l-[1px] border-gray-500' onClick={handleFilter}>{t("filter")}</button>
      </div>
      {/* {
          recently.length > 0
          ? <div>
            <RecentlyViewed/>
          </div>
          : null
        } */}
    </div>
  )
}

export default Catalog