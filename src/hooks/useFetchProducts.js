import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/Base_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useFetchProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Start loading
                setError(null);    // Reset any previous errors
                const req = await axios.get(`${BASE_URL}/products`)
                if(req.data && req.data.data.products.length > 0){
                    setProducts(req.data.data.products)
                }else{
                    setProducts([]);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err);  // Set error state if request fails
                toast.error("Failed to fetch product details!");  // Show toast error
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchProducts(); 
    }, []); 

  return { products, loading, error }; // Return product data, loading state, and error state
};

export default useFetchProducts;