import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { colors } from "../../config";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartWithFilters = ({ title, fontSize=18, initialData }) => {
  const [selectedTypes, setSelectedTypes] = useState(
    Object.keys(initialData.types) // Initially, all bar types are selected
  );
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(initialData.categories) // Initially, all categories are selected
  );

  // Filter data based on selections
  const filteredData = {
    labels: selectedCategories, // Only show selected categories
    datasets: Object.entries(initialData.types)
      .filter(([type]) => selectedTypes.includes(type)) // Only include selected types
      .map(([type, color]) => ({
        label: type,
        data: selectedCategories.map(
          (category) => initialData.categories[category]?.[type] || 0
        ), // Use 0 if the type is not available for a category
        backgroundColor: color,
      })),
  };

  // Chart options
  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
    },
  };

  // Handle type selection
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) // Deselect type
        : [...prev, type] // Select type
    );
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Deselect category
        : [...prev, category] // Select category
    );
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
        <Box display="flex" gap={2} sx={{width:"100%"}}>
        {/* Left: Type filters */}
        <Box sx={{width:"20%", alignContent: "center"}}>
            {Object.keys(initialData.types).map((type) => (
            <FormControlLabel
                key={type}
                control={
                <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    sx={{
                        color: colors.bg3, // Purple for unchecked state
                        "&.Mui-checked": {
                        color: colors.primary, // Light purple for checked state
                        },
                    }}
                />
                }
                label={type}
            />
            ))}
        </Box>

        {/* Middle: Chart */}
        <Box flex={1} sx={{
            width: "80%"
            }}>
            <Chart 
                type="bar" data={filteredData} 
                options={options} />
        </Box>
        </Box>

        {/* Right: Category filters */}
        <Box sx={{width:"100%", alignContent: "center", display:"flex", flexDirection:"row", flexWrap:"wrap", mt:"4px"}}>
            {Object.keys(initialData.categories).map((category) => (
            <FormControlLabel
                key={category}
                control={
                <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    sx={{
                        color: colors.bg3, // Purple for unchecked state
                        "&.Mui-checked": {
                        color: colors.primary, // Light purple for checked state
                        },
                    }}
                />
                }
                label={category}
            />
            ))}
        
        </Box>
    </Box>
  );
};

export default BarChartWithFilters;
