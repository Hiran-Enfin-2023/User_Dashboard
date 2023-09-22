import "./App.css";
import Header from "./components/Header/Header";
import AdminDashboard from "./components/admin/adminDashboard/AdminDashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import axiosInstance from "./axios";
import { useEffect, useState } from "react";
import AdminIndex from "./routes/admin/AdminIndex";
import UserIndex from "./routes/user/UserIndex";


function App() {
  return (
    <div style={{ height: "100vh" }}>
      {/* <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/user/dashboard" element={<UserPage />} />
      </Routes> */}

      
      <AdminIndex/>
      <UserIndex/>
    </div>
  );
}

export default App;
