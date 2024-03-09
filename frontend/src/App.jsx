import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from 'react'
import Rooms from "./components/Rooms";
import Admin from "./components/Admin";
import Staff from "./components/Staff";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/staff" element={<Staff />} />
    </Routes>
  </div>
);

export default App;
