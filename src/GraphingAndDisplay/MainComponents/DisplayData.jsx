import React from 'react'
import { Box } from "@mui/material";
import Overview from './Overview'
import ChatData from './ChatData'
import GroupChatData from './GroupChatData';

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
      </Box>
      <Box sx = {{padding: 10}}>
        <GroupChatData data = {data}/>
      </Box>
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