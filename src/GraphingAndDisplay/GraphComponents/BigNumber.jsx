import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../config';
import { formatDateToDDMMYY } from '../helper/DateFormatting';

const BigNumber = ({ 
    number, 
    label,
    padColor = colors.bg3,
    numberColor = colors.primary, 
    labelColor = colors.white, 
    fontSize = 36,
    numberWidth = "200px",
    labelWidth = "100px",
    height = "50px"
}) => {
  const digits = 8

  const numberString = (
    (number instanceof Date)
      ? formatDateToDDMMYY(number)
    : (number > createNumberWithNines(digits))
      ? toExponential(number, digits-3)
    : (typeof number === 'number' && !Number.isNaN(number) && !Number.isInteger(number))
      ? number.toFixed(digits-number.toFixed().length-1)
      : number.toFixed()
  )
  const padding = '0'.repeat(digits - numberString.length)

  return (
    <Box
      sx={{
        alignItems: 'center',
        width:"200px",
        height: height,
        padding: 1
      }}
    >
      
      {/* Display the label */}
      <Typography
        variant="subtitle1"
        component="div"
        width={labelWidth}
        sx={{
            fontSize: fontSize/2,
            color: labelColor,
            overflow: "clip",
        }}
      >
        {label}
      </Typography>
      {/* Display the number */}
      <Typography
        variant="h1"
        component="div"
        width={numberWidth}
        fontFamily={"monospace"}
        sx={{
            fontSize: fontSize,
            fontWeight: 'bold',
            textAlign: 'left',
            overflow: "clip"
        }}
      >
        <Box component="span" sx={{ color: colors.numberPadding }}>
          {padding}
        </Box>
        <Box component="span" sx={{ color: number >= 0 ? numberColor : colors.secondary }}>
          {numberString} 
        </Box>
        
      </Typography>

      
    </Box>
  );
};

export default BigNumber;

function toExponential(num, decimals) {
  const exponent = Math.floor(Math.log10(Math.abs(num)));
  const mantissa = num / Math.pow(10, exponent);

  return `${mantissa.toFixed(decimals)}e${exponent}`;
}

function createNumberWithNines(n) {
  return parseInt('9'.repeat(n), 10);
}