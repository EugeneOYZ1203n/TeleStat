import React from 'react'
import { Box, Button } from '@mui/material';
import { colors } from '../../config';

const ParseDataButton = ({handleParseData, disabled}) => {
  return (
    <Button 
        onClick={handleParseData} 
        variant="contained" 
        sx={{bgcolor: colors.primary, color: colors.black, display: disabled ? "none" : "inline-block"}}>
          Parse Data
    </Button>
  )
}

export default ParseDataButton