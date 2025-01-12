import React from 'react'
import { Box, Typography } from "@mui/material";
import BigNumber from '../GraphComponents/BigNumber'
import PieChart from '../GraphComponents/PieChart'
import { formatDateToDDMMYY } from '../helper/DateFormatting';
import { colors } from '../../config';
import HistogramChart from '../GraphComponents/HistogramChart';
import Overview_BigNumbers from '../SubComponents/Overview_BigNumbers';
import Overview_PieCharts from '../SubComponents/Overview_PieCharts';
import Overview_Histograms from '../SubComponents/Overview_Histograms';

const Overview = ({data}) => {
  

  

  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, bgcolor: colors.black }}>

      <Typography>Overall Stats across all Chats</Typography>

      <Overview_BigNumbers data={data}/>

      <Overview_PieCharts data={data}/>
      
      <Overview_Histograms data = {data}/>
      
    </Box>
  )
}

export default Overview