import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../config';

const BigNumber = ({ 
    number, 
    label, 
    numberColor = colors.primary, 
    labelColor = colors.white, 
    fontSize = 48,
    width = "100px",
    height = "50px"
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        padding: 1
      }}
    >
      {/* Display the number */}
      <Typography
        variant="h1"
        component="div"
        sx={{
            fontSize: fontSize, // Customize font size
            color: numberColor,
            fontWeight: 'bold',
        }}
      >
        {number}
      </Typography>

      {/* Display the label */}
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
            fontSize: fontSize/2, // Customize font size
            color: labelColor,
            mt: 1, // Add some spacing between the number and the label
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default BigNumber;