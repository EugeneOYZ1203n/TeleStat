import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { colors } from "../../config";

const OptionsTab = ({options, setOptions}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
        ...prevOptions,
        [name]: value, // Update the specific option in the state object
      }))
  };

  const textFieldProps = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.white, // Border color
      },
      "&:hover fieldset": {
        borderColor: colors.primary, // Hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.primary, // Focused border color
      },
    },
    "& .MuiInputBase-input": {
      color: colors.white, // Text color
    },
    "& .MuiInputLabel-root": {
      color: colors.white, // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.primary, // Focused label color
    },
  }

  return (
        
    <Box width={"85%"} m={"auto"} mt={8} color={colors.white}>
        <Typography variant="h6">Options</Typography>
        <Box textAlign={"left"}>
        <Typography variant="body1" gutterBottom>
        Number of Chats to analyse:
        </Typography>
        <Typography variant="body2" sx={{fontStyle: 'italic', color:"grey"}} gutterBottom>
        Analysing the chats take some time, select the amount of chats to analyse from your most active chats.
        </Typography>
        <TextField
        color={colors.white}
        name="numChats"
        type="number"
        value={options.numChats}
        onChange={handleInputChange}
        placeholder="Enter number"
        fullWidth
        size="small"
        sx={textFieldProps}
        />
        </Box>
    </Box>
  );
};

export default OptionsTab;