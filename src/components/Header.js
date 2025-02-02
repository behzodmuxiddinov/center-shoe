import React, { useState, useEffect } from 'react'
import logo from '../images/logo.jpg'
import i18n from './i18next';
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, setDarkMode, showCart } from '../store/StoreReducer';
import { Container } from '../components'

const Header = () => {
    const store = useSelector(state => state.store)
    const cartStore = useSelector(state => state.cartItems)
    const { light } = store 
    const { cartItems } = cartStore
    const dispatch = useDispatch()
    const [ln, setLn] = useState('uz')


    const handleCart = () => {
        dispatch(showCart())
    }

    const handleTheme = () => {
        dispatch(changeTheme())
    }

    useEffect(() => {
        dispatch(setDarkMode())
        setLn(localStorage.getItem('lng'))
    }, [])

    const changeLng = (e) => {
        i18n.changeLanguage(e.target.value)
        localStorage.setItem('lng', i18n.language)
        setLn(e.target.value)
    }
    let refreshToken = localStorage.getItem('refreshToken')
  return (
      <div className='w-full py-3 border-b-[1px] border-gray-500'>
        <Container>
            <div className='flex justify-between'>
                <Link to='/'>
                    <div className={`p-1 border-[1px] rounded-full ${light ? 'border-black' : 'border-white'}`}>
                        <img src={logo} alt="logo" className='w-[80px] h-[80px] sm:w-[40px] sm:h-[40px] rounded-full'/>
                    </div>
                </Link>
                <div className='flex items-center'>
                    <select name="changelang" id="changelang" value={ln} onChange={changeLng} className='cursor-pointer bg-transparent text-gray-400'>
                        <option value='uz'>uz</option>
                        <option value='ru'>ru</option>
                    </select>
                    <Link to={refreshToken !== null ? '/account' : '/login'}>
                        <PersonIcon className='mx-6 sm:mx-3 scale-125 cursor-pointer'/>
                    </Link>
                    <button className='relative'>
                        <ShoppingCartIcon className='scale-110 mr-6 sm:mr-3 cursor-pointer' onClick={handleCart}/>
                        {cartItems?.length > 0 && cartItems?.[0].basketItems?.length > 0 && <div className='w-[10px] h-[10px] bg-gray-700 rounded-full absolute top-[1px] left-4 border-[1px] border-white'></div>}
                    </button>
                    <button className='cursor-pointer' onClick={handleTheme}>{light ? <WbSunnyIcon/> : <DarkModeIcon/>}</button>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Header