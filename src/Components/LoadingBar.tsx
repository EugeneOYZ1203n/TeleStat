import React from "react";
import { Box, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { colors } from "../config";

interface LoadingBarProps {
  message: string;
  value: number;
  total: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ message, value, total }) => {
  const percentage = Math.min((value / total) * 100, 100); // Cap percentage at 100%

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Typography variant="h6" color={colors.white} gutterBottom>
        {`${message}: ${value} / ${total} (${Math.round(percentage*10)/10}%)`}
      </Typography>

      <LinearProgress value={percentage} variant="determinate"/>
    </Box>
  );
};

export default LoadingBar;