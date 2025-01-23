import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/Base_URL';
import useNotify from './useNotify';

const useFetchProduct = (id, productUpdated) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notify } = useNotify()
  useEffect(() => {
    if (!id) {
      return;
    }else{
      const fetchProduct = async () => {
          try {
            setLoading(true);
            setError(null); 
            const req = await axios.get(`${BASE_URL}/products/${id}`);
            setProduct(req.data);
          } catch (err) {
            setError(err);  // Set error state if request fails
            notify("Failed to fetch product details!", "error");  // Show toast error
          } finally {
            setLoading(false); // Stop loading
          }
      };
      fetchProduct(); 
    }
  }, [id, productUpdated]); 

  return { product, loading, error };
};

export default useFetchProduct;
