import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistogramChart = ({ labels, values, beginAtZeroX = true, beginAtZeroY=true }) => {
  // Prepare the data for the histogram
  const chartData = {
    labels: labels, // X-axis labels (e.g., categories or bins)
    datasets: [
      {
        label: "Frequency", // Dataset label
        data: values, // Values for the bars (e.g., frequency counts)
        backgroundColor: "#36A2EB", // Color of the bars
        borderColor: "#1F78D1", // Border color of bars
        borderWidth: 1, // Border width of bars
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: beginAtZeroX,
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        beginAtZero: beginAtZeroY,
        title: {
          display: true,
          text: "Frequency",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Chart type="bar" data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default HistogramChart;
