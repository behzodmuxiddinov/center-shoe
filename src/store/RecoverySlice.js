import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/Base_URL";
import { useNotify } from "../hooks";
import axios from "axios";


const initialState = {
    pending : false,
    token : '',
    instruction : false
}

export const sentEmail = createAsyncThunk('email/recoveryEmail', async ( data ) => {
    const { notify } = useNotify()
    return await axios.post(`${BASE_URL}/users/forgot-password`, data)
        .then(res => res.data)
        .catch(err => {
            if(err.response.data.message === "User with this email does not exist!"){
                notify("User not found", "error")
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
        })
        builder.addCase(sentEmail.rejected, (state) => {
            state.pending = false
        })
    }
})

export default recoverySlice.reducer