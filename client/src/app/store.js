import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authencationReducer from '../redux/auth/authSlice'

export const store = configureStore({
    reducer:{
        authentication: authencationReducer
    }
})

export default store;