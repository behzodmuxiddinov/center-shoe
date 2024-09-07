import { configureStore } from "@reduxjs/toolkit";
import StoreReducer from "./StoreReducer";
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";
import AccountSlice from "./AccountSlice";
import RecoverySlice from "./RecoverySlice"

export const store = configureStore({
    reducer : {
        store : StoreReducer,
        products : ProductSlice,
        cartItems : CartSlice,
        account : AccountSlice,
        recoveryEmail : RecoverySlice
    }
})