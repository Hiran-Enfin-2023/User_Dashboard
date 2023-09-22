import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";
import AdminPage from "../../pages/admin/AdminPage";
import AdminNotLogged from "./AdminNotLogged";
import Login from "../../components/adminLogin/Login";
import AddMeeting from "../../pages/admin/addMeeting/AddMeeting";
import AdminDashboard from "../../components/admin/adminDashboard/AdminDashboard";
import EditMeeting from "../../pages/admin/editMeeting/EditMeeting";

function AdminIndex() {
  return (
    <div>
      <Routes>
        <Route element={<AdminLoggedIn />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/meetings" element={<AdminPage />} />
          <Route path="/admin/create" element={<AddMeeting />} />
          <Route path="/admin/edit/:id" element={<EditMeeting/>}></Route>
        </Route>
        <Route element={<AdminNotLogged />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminIndex;
