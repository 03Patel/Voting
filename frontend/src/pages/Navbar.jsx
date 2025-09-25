import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("name");
    navigate("/"); // redirect to login after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-blue-200">Voting Dashboard</Link>
      <div className="flex items-center gap-4">
        {sessionId ? (
          <>
            <span className="font-medium">Logged in as {localStorage.getItem("name")}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
