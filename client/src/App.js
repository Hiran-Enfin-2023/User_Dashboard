import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
