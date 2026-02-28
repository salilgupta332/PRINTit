import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Assignments from "../pages/Assignments";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AssignmentDetails from "../pages/AssignmentDetails";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import useAutoLogout from "../hooks/useAutoLogout";
export default function AppRoutes() {
  const { logout, isAuthenticated } = useAuth();

  // only run when logged in
useAutoLogout(isAuthenticated ? logout : null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assignments/:id" element={<AssignmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
