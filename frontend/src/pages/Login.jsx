import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name) return alert("Enter your name");

    try {
      const res = await axios.post("https://votiingapp.onrender.com/api/login", { name });
      localStorage.setItem("sessionId", res.data.sessionId);
      localStorage.setItem("name", res.data.name);
      navigate("/vote");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
  
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Enter Voting Room
        </button>
      </div>
    </div>
  );
}

export default Login;
