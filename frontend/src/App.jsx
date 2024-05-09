import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/" element={<Protected Home={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
