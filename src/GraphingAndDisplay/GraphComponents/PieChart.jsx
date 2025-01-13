import React from 'react';
import { Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { generatePieChartData, generatePieChartOptions } from '../helper/PieChartHelpers';


const PieChart = ({ 
  title, 
  label, 
  data, 
  legends=true, legendPosition='top', 
  tooltips=true, 
  fontSize = 18,
  width = "200px"
}) => {
  return (
      <Box
        sx={{
          width: width, // Adjust chart size
        }}
      >
        {title && (
          <Typography variant="h6" sx={{ mb: 2, fontSize: fontSize }}>
            {title}
          </Typography>
        )}
        <Pie data={generatePieChartData(data, label)} options={generatePieChartOptions(legends, legendPosition, tooltips)} />
      </Box>
  );
};

export default PieChart;