import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { colors, exportDataVersion } from "../../config";

const DownloadButton = ({ data }) => {

    const onDownload = () => {
        const jsonString = JSON.stringify({
            isTeleStatData : true,
            exportVersion : exportDataVersion,
            ...data,
        }, null, 2); // Pretty-print with 2 spaces

        // Create a Blob object
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";

        // Append the anchor to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the temporary URL
        URL.revokeObjectURL(url);
    }

    return (
        <Button
        variant="contained"
        color="primary"
        onClick={onDownload}
        startIcon={<DownloadIcon />}
        sx={{
            position: "fixed", // Fixed positioning
            top: "16px",       // Distance from the top
            right: "16px",     // Distance from the right
            zIndex: 1000,      // Ensure it stays above other elements
            borderRadius: "8px", // Optional: Rounded corners for styling
            bgcolor: colors.bg2,
        }}
        >
            <style>
                {`
                .MuiButton-root:hover .hover-text {
                    display: block !important;
                }
                `}
            </style>

            <span style={{ transition: "opacity 0.3s ease" }}>
                Download
            </span>
            <span
                style={{
                    marginLeft: "8px",
                    display: "none",
                    fontSize: "0.8em"
                }}
                className="hover-text"
            >
                - Faster Future Data Display
            </span>
        </Button>
    );
};

export default DownloadButton;