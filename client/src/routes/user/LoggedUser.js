
import { Navigate, Outlet } from "react-router-dom";


export default function LoggedUser(){
  
  const userToken = localStorage.getItem("user_token");
 
  return (
    userToken  ? <Outlet/> : <Navigate to="/login"/>
  )
}
