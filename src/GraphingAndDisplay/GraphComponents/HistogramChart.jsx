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
import { colors } from "../../config";

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistogramChart = ({ 
  title, 
  labels, 
  values, 
  beginAtZeroX = true, 
  beginAtZeroY=true, 
  fontSize=18,
  legends=false,
  legendPosition='top'
}) => {
  // Prepare the data for the histogram
  const chartData = {
    labels: labels, // X-axis labels (e.g., categories or bins)
    datasets: [
      {
        label: "Frequency", // Dataset label
        data: values, // Values for the bars (e.g., frequency counts)
        backgroundColor: colors.primary,
        borderWidth: 0, // Border width of bars
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: legendPosition,
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
          display: false,
        },
      },
      y: {
        beginAtZero: beginAtZeroY,
        title: {
          display: false,
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
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontSize: fontSize }}>
          {title}
        </Typography>
      )}
      <Chart type="bar" data={chartData} options={options} />
    </Box>
  );
};

export default HistogramChart;
