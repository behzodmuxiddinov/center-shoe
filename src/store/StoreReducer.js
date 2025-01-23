import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

let body = document.getElementsByTagName('body')

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
        editModal: false,
        productUpdated: false
    },
    reducers : {
        setDarkMode : ( state ) => {
            let mode = localStorage.getItem('theme')
            if(mode === 'false'){
                state.light = false
                localStorage.setItem('theme', false)
                document.getElementsByTagName('body')[0].classList.add("black")
            }
        },
        changeTheme : ( state ) => {
            state.light = !state.light
            localStorage.setItem('theme', state.light)
            if(state.light === false){
                document.getElementsByTagName('body')[0].classList.add("black")
            }else{
                document.getElementsByTagName('body')[0].classList.remove("black")
            }
        },
        toggleFilter : ( state ) => {
            state.filter = !state.filter
            if(state.filter === true){
                body[0].classList.add('unscrollable')
            }else{
                body[0].classList.remove('unscrollable')
            }
        },
        increaseQuantity : ( state ) => {
            state.quantity = state.quantity + 1
        },
        decreaseQuantity : ( state ) => {
            state.quantity = state.quantity - 1
        },
        showCart : ( state ) => {
            state.cart = true
            body[0].classList.add('unscrollable')
        },
        hideCart : ( state ) => {
            state.cart = false
            body[0].classList.remove('unscrollable')
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
            body[0].classList.remove('unscrollable')
        },
        showEditor : ( state ) => {
            state.editor = true
            body[0].classList.add('unscrollable')
        },
        openEditModal: ( state ) => {
            state.editModal = true;
            body[0].classList.add('unscrollable')
        },
        closeEditModal: ( state ) => {
            state.editModal = false;
            body[0].classList.remove('unscrollable')
        },
        toggleProductUpdated: state => {
            state.productUpdated = !state.productUpdated
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
    openEditModal,
    closeEditModal,
    toggleProductUpdated
} = storeSlice.actions
export default storeSlice.reducer