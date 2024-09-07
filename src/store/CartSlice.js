import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let refreshToken = localStorage?.getItem('refreshToken')

const initialState = {
    loading : false,
    cartItems : [],
    total : null
}

export const fetchCartItems = createAsyncThunk('cartItems/fetchItems', async () => {
    return await axios
        .get('http://13.51.195.13:5000/api/baskets',{
            headers : {
              Authorization : `Bearer ${refreshToken}`,
              "Content-Type" : "application/json"
            },
        })
        .then(res => res.data)
        .catch(err => console.error(err))
})

const cartSlice = createSlice({
    name : 'cartItems',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
            state.total = action.payload?.length > 0 ? action.payload?.map(item => item.total_sum).map(item => Number(item)).reduce((a,b) => a + b) : ''
        })
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.loading = false;
            state.cartItems = [];
        })
    }
})

export default cartSlice.reducer