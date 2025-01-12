import React from 'react';
import { Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { generatePieChartData, generatePieChartOptions } from '../helper/PieChartHelpers';

// Required for Chart.js to work properly
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title, label, data, legendPosition='top', tooltips=true, legends=true, width, height}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Pie Chart */}
      <Box
        sx={{
          width: width, // Adjust chart size
          height: height,
        }}
      >
        {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
        <Pie data={generatePieChartData(data, label)} options={generatePieChartOptions(legends, legendPosition, tooltips)} />
      </Box>
    </Box>
  );
};

export default PieChart;