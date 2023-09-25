
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLoggedIn() {
  
  const adminToken = localStorage.getItem("admin_token")

  return adminToken ? <Outlet /> : <Navigate to="/admin/login" />;
}
