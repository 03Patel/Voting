import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartComponent({ data }) {
  const chartData = {
    labels: Object.keys(data), // Option names
    datasets: [
      {
        label: "Votes",
        data: Object.values(data), // Vote counts
        backgroundColor: ["#3B82F6", "#F59E0B", "#EF4444"], // Tailwind colors
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Vote Results" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="mt-8">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;
