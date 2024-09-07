import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const storeSlice = createSlice({
    name : 'store',
    initialState : {
        light : true,
        cart : false,
        quantity : 1,
        filter : false,
        failed : false,
        loginfail : false,
        success : false,
        editor : false,
        successOrder : false
    },
    reducers : {
        setDarkMode : ( state ) => {
            let mode = localStorage.getItem('theme')
            if(mode == 'false'){
                state.light = false
                localStorage.setItem('theme', false)
                document.getElementsByTagName('body')[0].classList.add("black")
            }
        },
        changeTheme : ( state ) => {
            state.light = !state.light
            localStorage.setItem('theme', state.light)
            if(state.light == false){
                document.getElementsByTagName('body')[0].classList.add("black")
            }else{
                document.getElementsByTagName('body')[0].classList.remove("black")
            }
        },
        toggleFilter : ( state ) => {
            state.filter = !state.filter
            document.body.style.overflow = state.filter == true ? 'hidden' : 'auto';
        },
        hideSuccessOrder : ( state ) => {
            state.successOrder = false
            document.body.style.overflow = 'auto';
        },
        showSuccessOrder : ( state ) => {
            state.successOrder = true
            document.body.style.overflow = 'hidden';
        },
        increaseQuantity : ( state ) => {
            state.quantity = state.quantity + 1
        },
        decreaseQuantity : ( state ) => {
            state.quantity = state.quantity - 1
        },
        showCart : ( state ) => {
            state.cart = true
            document.body.style.overflow = 'hidden';
        },
        hideCart : ( state ) => {
            state.cart = false
            document.body.style.overflow = 'auto';
        },
        hideFilter : ( state ) => {
            state.filter = false
        },
        postFormdata : ( url, data ) => {
            axios.post( url, data )
        },
        userSuccess : ( state ) => {
            state.success = true
        },
        removeSuccess : ( state ) => {
            state.success = false
        },
        userFail : ( state ) => {
            state.failed = true
        },
        loginFail : ( state ) => {
            state.loginfail = true
        },
        removeLoginFail : ( state ) => {
            state.loginfail = false
        },
        removeUserFailed : ( state ) => {
            state.failed = false
        },
        hideEditor : ( state ) => {
            state.editor = false
            document.body.style.overflow = 'auto';
        },
        showEditor : ( state ) => {
            state.editor = true
            document.body.style.overflow = 'hidden';
        }
    }
})

export const { 
    changeTheme, 
    setDarkMode, 
    showCart, 
    increaseQuantity, 
    decreaseQuantity, 
    toggleFilter, 
    hideCart, 
    hideFilter,
    postFormData,
    userSuccess,
    removeSuccess,
    userFail,
    loginFail,
    removeLoginFail,
    removeUserFailed,
    hideEditor,
    showEditor,
    hideSuccessOrder,
    showSuccessOrder
} = storeSlice.actions
export default storeSlice.reducer