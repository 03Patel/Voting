import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Voting() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");

  const sessionId = localStorage.getItem("sessionId");
  const name = localStorage.getItem("name");
  const options = ["Option A", "Option B", "Option C"];

  useEffect(() => {
    if (!sessionId || !name) navigate("/login");
  }, [navigate, sessionId, name]);

  const handleVote = async () => {
    if (!selectedOption) return alert("Select an option");

    try {
      const res = await axios.post("http://localhost:5000/api/vote", {
        name,
        sessionId,
        option: selectedOption,
      });
      setMessage(res.data.message);
      setHasVoted(true);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Voting failed");
      setHasVoted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
 
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Cast Your Vote</h1>

        {hasVoted ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-semibold">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {options.map((opt) => (
              <label key={opt} className="flex items-center space-x-3 p-3 border rounded hover:bg-blue-50 cursor-pointer">
                <input
                  type="radio"
                  name="voteOption"
                  value={opt}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-5 h-5"
                />
                <span className="text-lg">{opt}</span>
              </label>
            ))}
            <button
              onClick={handleVote}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              Submit Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Voting;
