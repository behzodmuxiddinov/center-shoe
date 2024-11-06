import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Select from 'react-select';
import { Button } from './'
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress';
import makeAnimated from 'react-select/animated';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { closeEditModal } from '../store/StoreReducer';
import useFetchProduct from '../hooks/useFetchProduct';
import axios from 'axios'
import { toast } from 'react-toastify';

const EditProduct = () => {
    const store = useSelector(state => state.store)
    const { light } = store 
    const dispatch = useDispatch()
    const animatedComponents = makeAnimated();
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [name, setName] = useState('')
    const [pending, setPending] = useState(false)
    const [images, setImages] = useState([]);

    
    let id = localStorage?.getItem('id')
    let refreshToken = localStorage?.getItem('refreshToken')

    const state = useSelector(state => state.store)
    const { editModal } = state 
    const { t } = useTranslation()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const notify = () => {
        toast(t("productupdated"), {
            position: "top-right",
            type: "success",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: `${light ? "light" : "dark"}`,
        })
    }

    const onSubmit = async (data) => {
        data.name = name.value
        data.pictures = images
        data.size = size?.map(item => item.value)
        data.colors = color?.map(item => item.value)

        await axios.put(`https://api.sentrobuv.uz/products/update/${id}`, data, {
            headers: {
                Authorization : `Bearer ${refreshToken}`
            }
        })
        .then(res => {
            reset()
            notify()
            dispatch(closeEditModal()) 
        })
        .catch(err => console.log(err))
    }


    let nameOptions = [
        { value: 'Polo shirt', label: 'Polo shirt' },
        { value: 'Shirt', label: 'Shirt' },
        { value: 'T-Shirt', label: 'T-Shirt' },
        { value: 'Moccasin', label: 'Moccasin' },
        { value: 'Jeans', label: 'Jeans' },
        { value: 'Dvoyka', label: 'Dvoyka' },
        { value: 'Perfume', label: 'Perfume' },
        { value: 'Oxford shoes', label: 'Oxford shoes'},
        { value: 'Suits', label: 'Suits' },
        { value: 'Slippers', label: 'Slippers' }, 
        { value: 'Classic shirt', label: 'Classic shirt' },
        { value: 'Sneakers', label: 'Sneakers' },
        { value: 'Cardigan', label: 'Cardigan' },
        { value: 'Jacket', label: 'Jacket' },
        { value: 'Gilet', label: 'Gilet'},
        { value: 'Jumper', label: 'Jumper'}
    ]

    let colorOptions = [
        { value: 'black', label: 'black' },
        { value: 'white', label: 'white' },
        { value: 'gray', label: 'gray' },
        { value: 'blue', label: 'blue' },
        { value: 'dark-blue', label: 'dark-blue' },
        { value: 'green', label: 'green' },
        { value: 'red', label: 'red' },
        { value: 'brown', label: 'brown' },
        { value: 'violet', label: 'violet' },
        { value: 'orange', label: 'orange' }, 
        { value: 'dark-green', label: 'dark-green' }
    ]

    let sizeOptions = [
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'S', label: 'S' },
        { value: 'XL', label: 'XL' },
        { value: '2XL', label: '2XL' },
        { value: '3XL', label: '3XL' },
        { value: '4XL', label: '4XL'},
        { value: '30', label: '30' },
        { value: '31', label: '31' },
        { value: '32', label: '32' }, 
        { value: '33', label: '33' },
        { value: '34', label: '34' },
        { value: '35', label: '35' },
        { value: '36', label: '36' },
        { value: '37', label: '37' },
        { value: '38', label: '38' }, 
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' }, 
        { value: '42', label: '42' },
        { value: '43', label: '43' },
        { value: '44', label: '44' }
    ]

    let { product } = useFetchProduct(id)

    return (
        <div className={`w-full animate__animated animate__zoomIn h-screen fixed justify-center items-center z-50 pointer-events-none break-words ${editModal ? 'flex' : 'animate__animated animate__zoomOut'}`}>
            <div className='max-w-[1024px] w-full min-h-screen py-3 flex justify-center relative'>
                {
                    product
                        &&
                            <div className={`w-1/2 lg:w-3/4 md:w-full h-max bg-white p-5 sm:p-2 rounded-lg pointer-events-auto ${light ? 'bg-white' : 'bg-black'}`}>
                                <div onClick={() => dispatch(closeEditModal())} className='mb-2 w-full flex justify-end'>
                                    <HighlightOffIcon style={{ fontSize: 30 }} className="cursor-pointer"/>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className='text-gray-600'>
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={nameOptions}
                                        isSearchable
                                        className='relative z-50'
                                        onChange={selectedOptions => setName(selectedOptions)}
                                    /> 
            
                                    <input 
                                        type="text" 
                                        id="brand"
                                        {...register("brand", {
                                            required : {
                                                value : true,
                                                message : t("req")
                                            },
                                        })}
                                        placeholder={product.brand} 
                                        className='p-3 w-full rounded-md border-[1px] my-3 border-gray-300 focus:border-gray-500'
                                    />
                                    <p className='text-sm w-full text-start text-red-700'>{errors.brand?.message}</p>
            
                                    <input 
                                        type="text" 
                                        id="price"
                                        {...register("price", {
                                            required : {
                                                value : true,
                                                message : t("req")
                                            },
                                        })}
                                        placeholder={product.price} 
                                        className='p-3 my-3 w-full rounded-md border-[1px] border-gray-300 focus:border-gray-500'
                                    />
                                    <p className='text-sm w-full text-start text-red-700'>{errors.price?.message}</p>
            
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        isMulti
                                        options={sizeOptions}
                                        isSearchable
                                        className='relative z-40'
                                        onChange={selectedOptions => setSize(selectedOptions)}
                                    />
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        isMulti
                                        options={colorOptions}
                                        isSearchable
                                        className='my-4 relative z-30'
                                        onChange={selectedOptions => setColor(selectedOptions)}
                                    />
                                    <Button text={pending ? <CircularProgress /> : t("edit")}/>   
                                </form>
                            </div>
                }
                
            </div>
        </div>
    )
}

export default EditProduct