import React from 'react'
import { Box } from "@mui/material";
import Overview from './Overview'
import ChatData from './ChatData'

const DisplayData = ({data}) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: '100%',
          padding: 2,
          // backgroundColor: 'red'
        }}
      >
        <Overview data = {data}/>
      </Box>

      <Box
        sx={{
          width: '100%',
          padding: 2
        }}
      >
        <ChatData data = {data}/>
      </Box>
    </Box>
  )
}

export default DisplayData