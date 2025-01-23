import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import { useNotify } from '../hooks';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../store/StoreReducer';

const Filter = ({ setFilterby, filterby }) => {
    const { notify } = useNotify()
    const dispatch = useDispatch()
    const store = useSelector(state => state.store)
    const { light, filter } = store

    const handleFilter = () => {
        dispatch(toggleFilter())
    }
    const { t } = useTranslation()
    const [filterBtns, setFilterBtns] = useState([
        {
          id : uuidv4(),
          value : "polo shirt",
          active : false
        },
        {
          id : uuidv4(),
          value : "T-Shirt",
          active : false
        },
        {
          id : uuidv4(),
          value : "Moccasin",
          active : false
        },
        {
            id : uuidv4(),
            value : "Jeans",
            active : false
        },
        {
            id : uuidv4(),
            value : "Dvoyka",
            active : false
        },
        {
            id : uuidv4(),
            value : "Perfume",
            active : false
        },
        {
            id : uuidv4(),
            value : "Sneakers",
            active : false
        },
        {
            id : uuidv4(),
            value : "Suits",
            active : false
        },
        {
            id : uuidv4(),
            value : "Slippers",
            active : false
        },
        {
            id : uuidv4(),
            value : "Classic shirt",
            active : false
        },
        {
            id : uuidv4(),
            value : "Oxford shoes",
            active : false
        },
        {
            id : uuidv4(),
            value : "Cardigan",
            active : false
        },
        {
            id : uuidv4(),
            value : "Jacket",
            active : false
        },
        {
            id : uuidv4(),
            value : "Gilet",
            active : false
        },
        {
            id : uuidv4(),
            value : "Jumper",
            active : false
        }
    ])

    const filters = [
        {
            id : uuidv4(),
            name : t("polo"),
            value : "polo shirt"
        },
        {
            id : uuidv4(),
            name : t("tshirt"),
            value : "T-Shirt"
        },
        {
            id : uuidv4(),
            name : t("moccasin"),
            value : "Moccasin"
        },
        {
            id : uuidv4(),
            name : t("jeans"),
            value : "Jeans"
        },
        {
            id : uuidv4(),
            name : t("deuce"),
            value : "Dvoyka"
        },
        {
            id : uuidv4(),
            name : t("parfum"),
            value : "Perfume"
        },
        {
            id : uuidv4(),
            name : t("sneakers"),
            value : "Sneakers"
        },
        {
            id : uuidv4(),
            name : t("oxford"),
            value : "Oxford shoes"
        },
        {
            id : uuidv4(),
            name : t("suits"),
            value : "Suits"
        },
        {
            id : uuidv4(),
            name : t("slippers"),
            value : "Slippers"
        },
        {
            id : uuidv4(),
            name : t("classicshirt"),
            value : "Classic shirt"
        },
        {
            id : uuidv4(),
            name : t("cardigan"),
            value : "Cardigan"
        },
        {
            id : uuidv4(),
            name : t("jacket"),
            value : "Jacket"
        },
        {
            id : uuidv4(),
            name : t("gilet"),
            value : "Gilet"
        },
        {
            id : uuidv4(),
            name : t("jumper"),
            value : "Jumper"
        }
    ]

    const changeFilter = (e) => {
        setFilterBtns(filterBtns.map(item => {
            if(e.target.value === item.value){
              return {...item, active : true}
            }
            return {...item, active: false}
        }))
    }

    const applyFilter = () => {
        if(filterBtns.filter(item => item.active).length < 1){
            notify(t("select"), 'warning')
        }else{
            setFilterby(filterBtns.filter(item => item.active)[0].value)
            handleFilter()
        }
    }

    const resetFilter = () => {
        setFilterBtns(filterBtns.map(item => {
            return {...item, active: false}
        }))
        setFilterby('')
        dispatch(toggleFilter())
    }

  return (
    <div className={`flex flex-col fixed right-0 z-50 transition-all duration-1000 h-screen justify-between border-l-[1px] border-gray-500 opacity-100 w-[30%] lg:w-1/2 md:w-[65%] sm:w-[90%] ${light ? 'bg-white' : 'bg-black'} ${filter ? 'translate-x-0' : 'translate-x-[100%]'}`}>
        <div className='w-full flex items-center  justify-center p-5 h-[10%] border-b-[1px] border-gray-400'>
            <h2 className='text-2xl uppercase mr-5'>{t("filter")}</h2>
            <CloseIcon className='text-2xl cursor-pointer' onClick={handleFilter}/>
        </div>
        <div className='flex flex-col items-start pl-5 pt-5 h-[75%] overflow-scroll'>
            <h2 className='text-xl uppercase mb-2'>{t("filter")}</h2>
            {
                filterBtns.map(item => (
                    <button key={item.id} value={item.value} onClick={changeFilter} className='flex relative items-center mb-2 hover:scale-105 lowercase'>
                        <span className='w-2 h-2 rounded-full absolute z-10 bg-gray-600 pointer-events-none'></span>
                        <h4 className={`transition-all duration-300 z-20 pointer-events-none ${light ? 'bg-white' : 'bg-black'} ${item.active ? 'translate-x-3' : '-translate-x-1 2xl:translate-x-0'}`}>
                            {filters.map(filter => (
                                item.value === filter.value ? filter.name : ''
                            ))}
                        </h4>
                    </button>
                ))
            }
        </div>
        <div className='w-full flex flex-col items-center justify-center border-gray-500 border-t-[1px] py-2'>
            {
                filterby.length > 0 
                ? <button onClick={resetFilter} className='capitalize px-3 py-2 mb-1 min-w-[200px] sm:min-w-[150px] border-[1px] border-gray-300'>{t("reset")}</button>
                : null
            }
            <div onClick={applyFilter}>
                <Button text={t("apply")} />
            </div>
        </div>
    </div>
  )
}

export default Filter