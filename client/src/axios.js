import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers:{
        "Content-Type":"application/json",
        timeout:1000,
    }
})

instance.interceptors.request.use(function(cb){
    const userToken = localStorage.getItem("access_token")
    cb.headers.Authorization = userToken && `Bearer ${userToken}`;

    return cb;
})

export default instance