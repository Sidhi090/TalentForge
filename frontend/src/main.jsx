// main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import { Landing } from "./Pages/LandingPage/Landing";
import Signup from "./Pages/Auth/signup";
import { Login } from "./Pages/Auth/Login";
import ATS from "./Pages/ATS CHECKER/ATS";
import Resume from "./Pages/ResumeBuilder/Resume";
import Professional from "./Pages/Templates/Professional";
import Modern from "./Pages/Templates/Modern";

// Wrap all routes in a function component
function MainApp() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ATS" element={<ATS />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/templates/professional" element={<Professional />} />
        <Route path="/templates/modern" element={<Modern />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
