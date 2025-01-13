import React, { useState } from "react";
import { Box, FormControlLabel, Typography, RadioGroup, Radio, Chip } from "@mui/material";
import { colors } from "../../config";


const KeywordsWithFilters = ({ title, fontSize=18, initialData }) => {
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
      <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1, // Space between badges
        p: 2,  // Padding around the container
      }}
    >
      {initialData[selectedCategory].length == 0 
        ? (<Typography variant="h6" sx={{ mb: 2, color: colors.primary}}>
            None
          </Typography>)
        : (initialData[selectedCategory].map((item, index) => (
            <Chip
              key={index}
              label={item}
              sx={{
                color: colors.black,
                bgcolor: colors.primary,
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "16px", // Makes it look like a bubble
              }}
            />
          )))
      }
      
    </Box>

      <Box sx={{alignContent: "center", display:"flex", flexDirection:"row"}}>
      <RadioGroup value={selectedCategory} onChange={handleCategoryChange} sx={{alignContent: "center", display:"flex", flexDirection:"row"}}>
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
  );
};

export default KeywordsWithFilters;
