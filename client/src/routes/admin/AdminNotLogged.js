import { Navigate, Outlet } from "react-router-dom";

export default function AdminNotLogged(){
    
  const adminToken = localStorage.getItem("admin_token");
    return adminToken ? <Navigate to="/admin"/> : <Outlet/>
    
    
}
