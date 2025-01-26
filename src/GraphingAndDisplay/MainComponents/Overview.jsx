import React from 'react'
import { Box, Typography } from "@mui/material";
import { colors } from '../../config';
import Overview_BigNumbers from '../SubComponents/Overview_BigNumbers';
import Overview_PieCharts from '../SubComponents/Overview_PieCharts';
import Overview_Histograms from '../SubComponents/Overview_Histograms';

const Overview = ({data}) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, bgcolor: colors.grey2}}>
      
      <Typography
        variant="h3"
        component="div"
        color={colors.primary}
      >
        Overall Stats
      </Typography>
      <Typography
        variant="body" 
        sx = {{fontStyle: 'italic', color:colors.grey3}}
      >
        (Across the selected chats)
      </Typography>
      <Overview_BigNumbers data={data}/>

      <Overview_PieCharts data={data}/>
      
      <Overview_Histograms data = {data}/>
      
    </Box>
  )
}

export default Overview