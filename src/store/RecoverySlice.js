import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/Base_URL";


const initialState = {
    pending : false,
    token : '',
    instruction : false
}

export const sentEmail = createAsyncThunk('email/recoveryEmail', async ( data ) => {
    console.log(data)
    return await axios.post(`${BASE_URL}/users/forgot-password`, data)
        .then(res => res.data)
        .catch(err => {
            if(err.response.data.message == "User with this email does not exist!"){
                alert("User not found")
            }
        })
})

const recoverySlice = createSlice({
    name : 'recoveryEmail',
    initialState,
    extraReducers : ( builder ) => {
        builder.addCase(sentEmail.pending, (state) => {
            state.pending = true
        })
        builder.addCase(sentEmail.fulfilled, (state, action) => {
            state.instruction = true
            state.token = action.payload.token
            state.pending = false
            console.log(state.token)
        })
        builder.addCase(sentEmail.rejected, (state) => {
            state.pending = false
            // alert('Error')
        })
    }
})

export default recoverySlice.reducer