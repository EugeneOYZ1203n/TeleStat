import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography, RadioGroup, Radio } from "@mui/material";
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
import HistogramChart from "./HistogramChart";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistogramChartWithFilters = ({ title, fontSize=18, initialData }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(initialData)[0] // Initially, all categories are selected
  );

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.target.value);
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
      <HistogramChart 
        labels={initialData[selectedCategory].labels}
        values={initialData[selectedCategory].values}
      />

      <Box sx={{alignContent: "center", display:"flex", flexDirection:"row"}}>
      <RadioGroup value={selectedCategory} onChange={handleCategoryChange} sx={{alignContent: "center", display:"flex", flexDirection:"row"}}>
        {Object.keys(initialData).map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={
              <Radio
                sx={{
                  color: colors.bg3, // Unchecked color
                  "&.Mui-checked": {
                    color: colors.primary, // Checked color
                  },
                }}
              />
            }
            label={type}
          />
        ))}
      </RadioGroup>
      </Box>
    </Box>
  );
};

export default HistogramChartWithFilters;
