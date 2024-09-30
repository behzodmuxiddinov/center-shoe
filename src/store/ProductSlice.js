import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../api/Base_URL'

const initialState = {
    loading : false,
    products : [],
    error : ''
}

export const getProducts = createAsyncThunk('product/fetchProducts', async () => {
    return await axios
        .get(`${BASE_URL}/products`)
        .then(res => res.data)
        .catch(err => alert(err))
})

const productSlice = createSlice({
    name : 'products',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.loading = false;
            state.products = [];
        })
    }
})

export default productSlice.reducer