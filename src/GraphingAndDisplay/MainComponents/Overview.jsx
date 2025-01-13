import React from 'react'
import { Box, Typography } from "@mui/material";
import { colors } from '../../config';
import Overview_BigNumbers from '../SubComponents/Overview_BigNumbers';
import Overview_PieCharts from '../SubComponents/Overview_PieCharts';
import Overview_Histograms from '../SubComponents/Overview_Histograms';

const Overview = ({data}) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, bgcolor: colors.black }}>

      <Typography
        variant="h1"
        component="div"
        fontSize={30}
        color={colors.primary}
      >
        Overall Stats across all Chats
      </Typography>

      <Overview_BigNumbers data={data}/>

      <Overview_PieCharts data={data}/>
      
      <Overview_Histograms data = {data}/>
      
    </Box>
  )
}

export default Overview