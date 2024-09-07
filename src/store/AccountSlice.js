import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";


const initialState = {
    loading : false,
    userName : '',
    lastName : '',
    email : '',
    phoneNumber : '',
    id : null
}

export const fetchAccount = createAsyncThunk('account/fetchAccount', async () => {
    let refreshToken = localStorage.getItem('refreshToken')
    return await axios.get(`http://13.51.195.13:5000/api/users/profile`, {
        headers: {
            Authorization : `Bearer ${refreshToken}`,
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.data)
    .catch(error => alert(error))
})

const accountSlice = createSlice({
    name : 'account',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            state.userName = action.payload?.first_name;
            state.lastName = action.payload?.last_name;
            state.email = action.payload?.email;
            state.phoneNumber = action.payload?.phone_number;
            state.id = action.payload?.id
            state.loading = false;
        })
        builder.addCase(fetchAccount.rejected, (state) => {
            state.loading = false;
            alert('Something went wrong!')
        })
    }
})

export default accountSlice.reducer