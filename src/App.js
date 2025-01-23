import React,{ useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import i18n from './components/i18next';
import { Layout, Cart, Filter, Overlay, Preloading, Success, ProtectedAdmin, ProtectedCheckout, AccountEditor, EditProduct } from './components';
import { Account, Main, Register, Login, Product, Catalog, Checkout, AdminPage, RecoveryPage, ProtectedRoute } from './pages'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from './store/ProductSlice';
import { BASE_URL } from './api/Base_URL'
import { ToastContainer } from 'react-toastify';
import { useNotify } from './hooks';
import './App.css';
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.products)
  const { loading } = state
  const { notify } = useNotify()
  const refreshToken = localStorage?.getItem('refreshToken')
  useEffect(() => {
    let lastLn = localStorage.getItem('lng') 
    i18n.changeLanguage(lastLn)
    localStorage.setItem('viewed', null)
    if(refreshToken){
      axios.get(`${BASE_URL}/users/profile`, {
        headers : {
          Authorization : `Bearer ${refreshToken}`
        }
      })
      .then(res => {
        if(res.data.role !== 'user'){
          setAdmin(true)
        }
      })
      .catch(error => notify(error.message, "error"))
    }
    dispatch(getProducts())
  }, [])

  const store = useSelector(state => state.store)
  const { success, editModal, editor } = store

  const [admin, setAdmin] = useState(false)
  const [currentItems, setCurrentItems] = useState([])
  const [filterby, setFilterby] = useState('')
  const [viewed, setViewed] = useState([])

  if(loading){
    return <Preloading/>
  }

  return (
    <>
      {success && <Success/>}
      {editModal && <EditProduct/>}
      {editor && <AccountEditor/> }
      <Cart/>
      <Filter setFilterby={setFilterby} filterby={filterby}/>
      <Overlay/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='/' element={<Main viewed={viewed} setViewed={setViewed} admin={admin}/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/product/:id' element={<Product admin={admin}/>}></Route>
          </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/account' element={<Account/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/catalog' element={<Catalog currentItems={currentItems} setCurrentItems={setCurrentItems} filterby={filterby} viewed={viewed} setViewed={setViewed} />}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/catalog/product/:id' element={<Product admin={admin}/>}></Route>
          </Route>
          <Route element={<ProtectedAdmin admin={admin}/>}>
            <Route path='admin' element={<AdminPage/>}></Route>
          </Route>
          <Route element={<ProtectedCheckout/>}>
            <Route path='/checkout' element={<Checkout/>}></Route>
          </Route>
          <Route path={`/forgot-password`} element={<RecoveryPage/>}></Route>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
