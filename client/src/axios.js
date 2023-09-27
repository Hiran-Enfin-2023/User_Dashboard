import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api/",
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  // console.log("instance", config);
  const token = localStorage.getItem("user_token");
  const auth = token ? `${token}` : "";

  config.headers.Authorization = auth;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      //   console.log("response instance", response);
      return response;
    }

    return response;
  },
  (error) => {
    if (error) {
      console.log(error);
      // window.location.assign('/login');
    
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
