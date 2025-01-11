import React, { useState } from "react";
import { Typography, Paper, Alert } from "@mui/material";
import { colors } from "../config";

const Dropzone = ({ setParsedJson }) => {
  const [error, setError] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setError(null);

    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
            const parsedJson = JSON.parse(e.target?.result);

            if (!parsedJson.chats || !parsedJson.chats.list) {
                throw new Error("Invalid JSON format")
            }
            
            setParsedJson(parsedJson);
        } catch (err) {
            setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please drop a valid JSON file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        border: `2px dashed ${colors.white}`,
        padding: 4,
        margin: "auto",
        width: "300px",
        height: "150px",
        textAlign: "center",
        alignContent: "center",
        verticalAlign: "center",
        backgroundColor: colors.bg2,
        "&:hover": {
          backgroundColor: colors.bg1,
        },
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        <Typography variant="h6" color={colors.white}>
            Drag and drop your JSON file here
        </Typography>
        {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
            {error}
            </Alert>
        )}
    </Paper>
  );
};

export default Dropzone;