import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Home } from "../pages/Home";
import { PrivateRoute } from "../utils/PrivateRoute";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
      </Routes>
    </Router>
  );
};
