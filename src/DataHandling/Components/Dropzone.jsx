import React, { useState, useRef, useEffect } from "react";
import { Typography, Paper, Alert } from "@mui/material";
import { colors } from "../../config";
import docsvg from "../../assets/icons8-document.svg";

const Dropzone = ({ setParsedJson }) => {
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const fileInputRef = useRef(null);
  const errorRef = useRef(null);
  
  const handleDrop = (event) => {
    event.preventDefault();
    setError(null);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSelect = (event) => {
    setError(null);
    const file = event.target.files[0];
    handleFile(file);
  };

  useEffect(() => {
    if (error && errorRef.current) {
      // Scroll smoothly to the error message
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  const handleFile = (file) =>{
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
            const parsedJson = JSON.parse(e.target?.result);

            if (!parsedJson.chats || !parsedJson.chats.list) {
                throw new Error("Invalid JSON format")
            }
            
            setFileName(file.name)
            setFileSize(file.size)
            
            setParsedJson(parsedJson);
        } catch (err) {
            setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please drop a valid JSON file.");
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <Paper
      elevation={3}
      sx={{
        border: `2px dashed ${colors.white}`,
        padding: 4,
        margin: "auto",
        width: "80%",
        height: "150px",
        textAlign: "center",
        alignContent: "center",
        verticalAlign: "center",
        marginBottom: "50px",
        cursor:"pointer",
        backgroundColor: colors.bg2,
        "&:hover": {
          backgroundColor: colors.bg1,
        },
        borderRadius: "10px",
        transition: "background-color 0.25s ease",
        position:"relative"
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <img 
        src={docsvg}
        alt="Document Icon" 
        style={{
          position: "absolute", 
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "150px",
          height: "auto",

        }}
      />
      <Typography variant="h6" color={colors.white} sx={{position: "relative"}}>
          { fileName 
            ? `Uploaded ${fileName} (${convertSize(fileSize)})`
            : (<span>Click to select file from system <br></br>
              or<br></br>
              Drag and drop here</span>)
          }
      </Typography>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }} 
        onChange={handleSelect} 
      />
    </Paper>
    {error && (
      <Alert 
        severity="error" 
        sx={{ 
          margin: "auto",
          marginBottom:"50px",
          paddingLeft: 4,
          paddingRight: 4,
          mt: 2,
          width: "50%",
        }}
        ref={errorRef}
      >
      {error}
      </Alert>
    )}
    </>
  );
};

export default Dropzone;

function convertSize(sizeBytes, decimalBase = true) {
  if (sizeBytes === 0) return "0 Bytes";

  const base = decimalBase ? 1000 : 1024;
  const suffixes = decimalBase
      ? ["B", "KB", "MB", "GB", "TB", "PB"]
      : ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];

  let i = 0;
  while (sizeBytes >= base && i < suffixes.length - 1) {
      sizeBytes /= base;
      i++;
  }

  return `${sizeBytes.toFixed(2)} ${suffixes[i]}`;
}