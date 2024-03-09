import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from 'react'
import Rooms from "./components/Rooms";
import Admin from "./components/Admin";
import Staff from "./components/Staff";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </div>
);

export default App;
