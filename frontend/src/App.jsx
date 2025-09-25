import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Voting from "./pages/Voting";
import Navbar from "./pages/Navbar"; // Navbar should be in components

function App() {
  return (
    <Router>
      {/* Navbar outside Routes so it shows on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vote" element={<Voting />} />
      </Routes>
    </Router>
  );
}

export default App;
