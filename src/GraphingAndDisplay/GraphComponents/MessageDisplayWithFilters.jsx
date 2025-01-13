import React, { useState } from "react";
import { Box, FormControlLabel, Typography, RadioGroup, Radio } from "@mui/material";
import { colors } from "../../config";


const MessageDisplayWithFilter = ({ title, fontSize=18, initialData }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(initialData)[0] // Initially, all categories are selected
  );

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {title && (
          <Typography variant="h6" sx={{ mb: 2, fontSize: fontSize }}>
            {title}
          </Typography>
      )}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%"
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: 2,
            margin: "auto",
            width: "60%"
          }}
        >
          {Object.entries(initialData[selectedCategory]).map(([messageNumber, messageData]) => {
            const { isFrom, username, date, text } = messageData;

            return (
              <Box
                key={messageNumber}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isFrom ? "flex-start" : "flex-end",
                }}
              >
                {/* Username */}
                <Typography
                  variant="caption"
                  color={colors.white}
                  sx={{ alignSelf: isFrom ? "flex-start" : "flex-end" }}
                >
                  {username} - {new Date(date).toLocaleString()} - {messageNumber}
                </Typography>

                {/* Text Bubble */}
                <Box
                  sx={{
                    padding: "4px 8px",
                    borderRadius: "16px",
                    backgroundColor: isFrom ? "primary.light" : "secondary.light",
                    color: isFrom ? "black" : "white",
                    maxWidth: "75%",
                    wordBreak: "break-word",
                    textAlign: "left",
                  }}
                >
                  <Typography variant="body1">{text}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

      <Box sx={{alignContent: "center", display:"flex", ml:"16px"}}>
      <RadioGroup value={selectedCategory} onChange={handleCategoryChange} sx={{alignContent: "center", display:"flex"}}>
        {Object.keys(initialData).map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={
              <Radio
                sx={{
                  color: colors.bg3, // Unchecked color
                  "&.Mui-checked": {
                    color: colors.primary, // Checked color
                  },
                }}
              />
            }
            label={type}
          />
        ))}
      </RadioGroup>
      </Box>
      </Box>
    </Box>
  );
};

export default MessageDisplayWithFilter;
