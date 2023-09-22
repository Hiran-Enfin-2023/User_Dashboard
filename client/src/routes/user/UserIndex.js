import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "../../pages/user/UserPage";
import JoinMeeting from "../../pages/joinMeeting/JoinMeeting";
import LoggedUser from "./LoggedUser";
import NotLoggedUser from "./NotLoggedUser";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

function UserIndex() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedUser />}>
          <Route path="/" element={<UserPage />} />
          <Route path='/meeting/slug' element={<JoinMeeting />} />
        </Route>
        <Route element={<NotLoggedUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserIndex;