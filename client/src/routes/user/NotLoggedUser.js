
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedUser() {

  const userToken = localStorage.getItem("user_token");

  
  return userToken ? <Navigate to="/" /> : <Outlet />;
}
