import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

function Dashboard() {
  const [results, setResults] = useState({});

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");

      // Ensure all options exist with default 0
      const allOptions = ["Option A", "Option B", "Option C"];
      const filledResults = {};
      allOptions.forEach((opt) => {
        filledResults[opt] = res.data[opt] || 0;
      });

      setResults(filledResults);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Voting Dashboard</h1>
        {Object.keys(results).length === 0 ? (
          <p className="text-center text-gray-500">No votes yet</p>
        ) : (
          <ul className="space-y-3 text-lg">
            {Object.entries(results).map(([option, count]) => (
              <li
                key={option}
                className="p-3 bg-blue-50 rounded shadow flex justify-between"
              >
                <span>{option}</span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        )}
        <ChartComponent data={results} />
      </div>
    </div>
  );
}

export default Dashboard;
