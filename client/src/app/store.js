import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authencationReducer from '../redux/auth/authSlice'
import {login} from "../redux/auth/authenticationThunks"
export const store = configureStore({
    reducer:{
        authentication: authencationReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        thunk:{
            extraArgument: {login}
        }
    })
})

export default store;