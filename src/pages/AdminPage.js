import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Tabtitle, Button } from '../components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid'
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from '../api/Base_URL'

const animatedComponents = makeAnimated();

const AdminPage = () => {

    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [name, setName] = useState('')
    const [pending, setPending] = useState(false)

    const navigate = useNavigate()

    const { t } = useTranslation()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        control
    } = useForm({
        mode: "onBlur",
    });

    let sizeOptions = [
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'S', label: 'S' },
        { value: 'XL', label: 'XL' },
        { value: '2XL', label: '2XL' },
        { value: '3XL', label: '3XL' },
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
        { value: 'Sneakers', label: 'Sneakers' }
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

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    let refreshToken = localStorage?.getItem('refreshToken')
    const onSubmit = async (data) => {
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
        await axios.post(`${BASE_URL}/api/products/create`, data2, {
            headers : {
                Authorization : `Bearer ${refreshToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data2)
        })
        .then(res => {
                axios.post(`${BASE_URL}/api/products/upload/${res.data.data.id}`, data.pictures, {
                headers : {
                    Authorization : `Bearer ${refreshToken}`,
                    "Content-Type" : "multipart/form-data"
                },
                body : JSON.stringify(data.product_id)
            })
            .then(res => {
                setPending(false)
                alert(t("added"))
                navigate("/")
            })
            .catch(error => alert(error))
        })
        .catch(error => alert(error))
        reset()      
    }
    
    Tabtitle(t("addProduct"))

  return (
    <div className='w-full min-h-screen py-3 px-11 md:px-3 flex justify-center relative'>
        <div className='w-1/2 lg:w-3/4 md:w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={nameOptions}
                    isSearchable
                    className='relative z-50'
                    onChange={selectedOptions => setName(selectedOptions)}
                />
                
                <div className='p-3 w-full rounded-md border-[1px] border-gray-300 focus:border-gray-500 my-3 bg-white'>
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
                        className='text-gray-600'
                    />
                </div> 
                <p className='text-sm w-full text-start text-red-700'>{errors.images?.message}</p> 

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
                    className='p-3 w-full rounded-md border-[1px] border-gray-300 focus:border-gray-500'
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
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={sizeOptions}
                    isSearchable
                    className='relative z-40'
                    onChange={selectedOptions => setSize(selectedOptions)}
                />
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={colorOptions}
                    isSearchable
                    className='mt-4 relative z-30'
                    onChange={selectedOptions => setColor(selectedOptions)}
                />
                <Button text={pending ? <CircularProgress /> : t("addProduct")}/>   
            </form>
        </div>
    </div>
  )
}

export default AdminPage

