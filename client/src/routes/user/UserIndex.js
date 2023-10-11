import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "../../pages/user/UserPage";
import LoggedUser from "./LoggedUser";
import NotLoggedUser from "./NotLoggedUser";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import ForgotPassword from "../../components/resetPassword/ForgotPassword";
import ResetPassword from "../../components/resetPassword/ResetPassword";
// import MeetingPage from "../../pages/meetingPage/MeetingPage";
import UserProfile from "../../pages/user/UserProfile";
import JoinMeeting from "../../pages/user/JoinMeeting";
import RejoinPage from "../../pages/user/RejoinPage";

function UserIndex() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedUser />}>
          <Route path="/" element={<UserPage />} />
          <Route path="/meeting/:slug" element={<JoinMeeting />} />
          <Route path="/meeting/rejoin/:slug" element={<RejoinPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route element={<NotLoggedUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserIndex;
