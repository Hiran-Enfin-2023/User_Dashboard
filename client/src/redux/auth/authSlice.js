import { createSlice } from "@reduxjs/toolkit";
import { validateUser } from "../../services/validateUser";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("user_token"),
  isAdmin: null,
  loading: true,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAdmin = action.payload.isAdmin;
    },
    stillOnline(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = localStorage.getItem("user_token");
      state.isAdmin = action.payload.isAdmin;
      state.loading = false
    },
    logoutSucess(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("user_token");
    },
  },
});

export const { logoutSucess, stillOnline, loginSuccess } = authenticationSlice.actions;

// export const selectIsAuthenticated = (state) =>state.auth

export default authenticationSlice.reducer;

// receive user token from login
// validate user with user token
// set the fetched data from api to redux state
