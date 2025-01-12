import React from 'react'
import { colors } from '../../config'
import { Box } from "@mui/material";
import Overview from './Overview'
import ChatList from './ChatList'
import Sidebar from './Sidebar';

const DisplayData = ({data}) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: '100%',
          padding: 2
        }}
      >
        <Overview data = {data}/>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1, // Takes remaining vertical space
          width: '100%',
        }}
      >

        <Box
          sx={{
            flex: 1,
            padding: 2
          }}
        >
          <ChatList/>
        </Box>

        <Box
          sx={{
            width: '100px', // Fixed width
            padding: 2,
          }}
        >
          <Sidebar/>
        </Box>
      </Box>
    </Box>
  )
}

export default DisplayData