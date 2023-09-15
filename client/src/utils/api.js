import axios from "axios";
const token = localStorage.getItem("access_token")
axios.interceptors.response(
    function(cb){
        cb.headers.Authorization = `Bearer ${token}`
        config.baseURL = 'http://localhost/api/';
    }
)