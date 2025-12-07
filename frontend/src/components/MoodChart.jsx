import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function MoodChart({ history, forecast }) {
  if (!history || history.length === 0) {
    return (
      <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
        no mood logs yet – log a few days to see the rollercoaster.
      </div>
    );
  }

  const historyLabels = history.map((p) => p.date);
  const historyScores = history.map((p) => p.score);
  const forecastLabels = forecast ? forecast.map((p) => p.date) : [];
  const forecastScores = forecast ? forecast.map((p) => p.predicted_score) : [];

  const data = {
    labels: [...historyLabels, ...forecastLabels],
    datasets: [
      {
        label: "mood (history)",
        data: [...historyScores, ...Array(forecastScores.length).fill(null)],
        borderColor: "#38bdf8",
        tension: 0.3,
      },
      {
        label: "mood (forecast)",
        data: [...Array(historyScores.length).fill(null), ...forecastScores],
        borderColor: "#a855f7",
        borderDash: [6, 4],
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div
      style={{
        background: "#020617",
        padding: "0.75rem",
        borderRadius: "0.75rem",
        border: "1px solid #1f2937",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default MoodChart;
