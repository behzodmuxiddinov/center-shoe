import { useState } from 'react'
import { useTranslation } from "react-i18next"
import { useNotify } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../api/Base_URL'
import { sizeOptions, nameOptions, colorOptions } from './utiles/constants'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from "react-redux"
import { Button } from './'
import { closeEditModal, toggleProductUpdated } from '../store/StoreReducer'
import CircularProgress from '@mui/material/CircularProgress';
import makeAnimated from 'react-select/animated';
import axios from 'axios'
import Select from 'react-select';

const Form = ({ type }) => {
    const dispatch = useDispatch()
    const animatedComponents = makeAnimated();
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [name, setName] = useState('')
    const [pending, setPending] = useState(false)
    const [images, setImages] = useState([]);
    const { notify } = useNotify()
    const navigate = useNavigate()

    const { t } = useTranslation()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });
    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    let refreshToken = localStorage?.getItem('refreshToken')
    let id = localStorage?.getItem('id')

    const onSubmit1 = async (data) => {
        data.name = name
        data.size = size?.map(item => item.value)
        data.colors = color?.map(item => item.value)
        data.pictures = images
        data.product_id = uuidv4()

        let data2 = {}
        data2.name = data.name.value
        data2.brand = data.brand
        data2.size = data.size
        data2.colors = data.colors
        data2.price = data.price

        let formData = new FormData()
        formData.append('pictures', data.pictures)
        formData.append('product_id', uuidv4())
        setPending(true)
        await axios.post(`${BASE_URL}/products/create`, data2, {
            headers : {
                Authorization : `Bearer ${refreshToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data2)
        })
        .then(res => {
                axios.post(`${BASE_URL}/products/upload/${res.data.data.id}`, data.pictures, {
                headers : {
                    Authorization : `Bearer ${refreshToken}`,
                    "Content-Type" : "multipart/form-data"
                },
                body : JSON.stringify(data.product_id)
            })
            .then(_ => {
                setPending(false)
                notify(t("added"), "success")
                navigate("/")
            })
            .catch(error => {
                setPending(false)
                notify(error.message, "error")
            })
        })
        .catch(error => {
            setPending(false)
            notify(error.message, "error")
        })
        reset()      
    }

    const onSubmit2 = async (data) => {
        data.name = name.value
        data.pictures = images
        data.size = size?.map(item => item.value)
        data.colors = color?.map(item => item.value)

        await axios.put(`${BASE_URL}/products/update/${id}`, data, {
            headers: {
                Authorization : `Bearer ${refreshToken}`
            }
        })
        .then(res => {
            reset()
            dispatch(closeEditModal()) 
            dispatch(toggleProductUpdated())
            setTimeout(() => {
                notify("productupdated", "success")
            }, 500);
        })
        .catch(err => {
            dispatch(closeEditModal()) 
            notify(err.message, "error")
        })
    }

    return (
        <form
            onSubmit={handleSubmit(type === 'add' ? onSubmit1 : onSubmit2)} 
            className="text-gray-600">
            <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={nameOptions}
                isSearchable
                className='relative z-50'
                onChange={selectedOptions => setName(selectedOptions)}
            />
            
            {type === 'add' && 
                <>
                    <div className='p-3 w-full rounded-md border-[1px] border-gray-300 focus:border-gray-500 mt-3 bg-white'>
                        <input
                            type="file"
                            id='pictures'
                            multiple
                            accept="image/*"
                            {...register("pictures", {
                                required : {
                                    value : true,
                                    message : t("req")
                                },
                            })}
                            onChange={handleImageChange}
                            required
                            className='text-gray-600 w-max'
                        />
                    </div> 
                    <p className='text-sm w-full text-start text-red-700'>{errors.images?.message}</p>
                </>
            }

            <input 
                type="text" 
                id="brand"
                {...register("brand", {
                    required : {
                        value : true,
                        message : t("req")
                    },
                })}
                placeholder={`${t("brand")}`} 
                className='p-3 mt-3 w-full rounded-md border-[1px] border-gray-300 focus:border-gray-500'
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
                placeholder={`${t("price")}`} 
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
            <Button text={pending ? <CircularProgress /> : t(type === 'add' ? "addProduct" : "edit")}/>   
        </form>
    )
}

export default Form