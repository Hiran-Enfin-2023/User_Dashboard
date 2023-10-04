import axiosInstance from "../axios"

export const validateUser = async()=>{

    const res = await axiosInstance.get("/auth/validate_user");

   return res.data
}