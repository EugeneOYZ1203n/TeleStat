import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { colors } from "../config";
import image1 from "../assets/Instructions1.png";
import image2 from "../assets/Instructions2.png";

const UsageInfo = ({}) => {
  return (
    <Paper
      sx={{
        padding: 4,
        margin: "auto",
        width: "80%",
        backgroundColor: colors.bg3,
        marginBottom:"30px",
        borderRadius:"10px"
      }}
    >
      <Typography variant="h3" color={colors.white}>
        TeleStat
      </Typography>
      <Typography 
        variant="body1" 
        color={colors.white} 
        sx={{ 
          textAlign: "left", 
          marginTop: 2, 
          backgroundColor: colors.bg1,
          borderRadius: "10px",
          padding: 5,
          marginBottom:"10px"
        }}
      >
        Welcome this is some text introducing what the app do 
        Welcome this is some text introducing what the app do 
        Welcome this is some text introducing what the app do
      </Typography>
      <Typography variant="h4" color={colors.white}>
        Instructions
      </Typography>
      <Box
      sx={{ 
        textAlign: "left", 
        marginTop: 2, 
        backgroundColor: colors.bg1,
        borderRadius: "10px",
        padding: 5,
        marginBottom:"10px"
      }}>
        <Typography variant="body1" color={colors.white}>
          1. On the Telegram PC app go under "Settings" <br></br>
          2. Select "Advanced" <br></br>
          3. Select "Export Telegram data" <br></br>
        </Typography>
        <img src={image1} alt="instruction guide" style={{ width: "100%", height: "auto", borderRadius:"5px", marginTop:"10px"}} />
        <Typography variant="body1" color={colors.white}> <br></br>
          4. Unselect every option except "Personal chats" <br></br>
          5. Select "Machine Readable JSON" <br></br>
          6. Export <br></br>
        </Typography>
        <img src={image2} alt="instruction guide2" style={{ width: "100%", height: "auto", borderRadius:"5px", marginTop:"10px"}} />
        <Typography variant="body1" color={colors.white}> <br></br>
          7. Upload the JSON below! <br></br>
        </Typography>
      </Box>
      
    </Paper>
  )
};

export default UsageInfo;
