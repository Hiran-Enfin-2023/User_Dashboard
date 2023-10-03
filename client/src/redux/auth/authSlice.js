import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated : false,
    user: {}
};


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers:{
        loginSuccess(state,action){
            state.isAuthenticated = true,
            state.user = action.payload
        },
        logoutSucess(state){
            state.isAuthenticated = false,
            state.user = null
        }
    }
});


export const {logoutSucess,loginSuccess} = authenticationSlice.actions

// export const selectIsAuthenticated = (state) =>state.auth

export default authenticationSlice.reducer