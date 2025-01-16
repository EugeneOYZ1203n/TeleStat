import React from 'react';
import { Box } from "@mui/material";
const ResizeableChartContainer = ({children}) => {
    return (
        <Box
            sx={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            width: "100%",
            }}
        >
            {children}
        </Box>
    );
}

export default ResizeableChartContainer