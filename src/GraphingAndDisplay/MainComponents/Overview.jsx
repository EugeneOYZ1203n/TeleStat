import React from 'react'
import { Box, Typography } from "@mui/material";
import BigNumber from '../SubComponents/BigNumber'
import PieChart from '../SubComponents/PieChart'
import { formatDateToDDMMYY } from '../helper/DateFormatting';
import { colors } from '../../config';
import HistogramChart from '../SubComponents/HistogramChart';

const Overview = ({data}) => {
  const bigNumbers = [
    {label: "Messages Sent", number: data.overall.messages_sent},
    {label: "Messages Received", number: data.overall.messages_received},
    {label: "Words Sent", number: data.overall.wordCount_sent},
    {label: "Words Received", number: data.overall.wordCount_received},
    {label: "Words Per Message", number: data.overall.avgWordCountPerMessageSent.toFixed(2)},
    {label: "First Message", number: formatDateToDDMMYY(data.overall.firstDateMessaged)},
    {label: "Last Message", number: formatDateToDDMMYY(data.overall.lastDateMessaged)},
    {label: "Days messaging", number: data.overall.daysBetweenFirstAndLastMessage},
    {label: "Daily Messages", number: data.overall.avgDailyMessages.toFixed(2)},
    {label: "Avg Sentiment", number: data.overall.avg_message_sentiments.toFixed(3)},
    {label: "Avg Reply Time (s)", number: data.overall.avgResponseTime.toFixed(2)},
    {label: "Median Reply Time (s)", number: data.overall.medianResponseTime.toFixed(2)}
  ]

  const emoji_percent = Math.round(data.overall.emoji_percent*1000)/10
  const punctuated_percent = Math.round(data.overall.punctuated_percent*1000)/10

  const hours_active_labels = Array.from({ length: 24 }, (_, i) => i);
  const hours_active_values = hours_active_labels.map((el)=>data.overall.hours_active[el] || 0)

  const daysOfWeek_active_labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const daysOfWeek_active_values = daysOfWeek_active_labels.map((el)=>data.overall.daysOfWeek_active[el] || 0)

  const months_active_labels = Array.from({ length: 12 }, (_, i) => 1+i);
  const months_active_values = months_active_labels.map((el)=>data.overall.month_active[el] || 0)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, bgcolor: colors.black }}>
      {/* Left side: Big numbers in a 4x3 grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Enables wrapping for big numbers
          flex: 2,
        }}
      >
        {bigNumbers.map((item, index) => (
          <BigNumber 
            key={index} number={item.number} label={item.label} 
            width="200px" height="80px" fontSize={36}
          />
        ))}
      </Box>
        
      {/* Right side: Two pie charts stacked on top of each other */}
      <Box sx={{ height: "350px", display: "flex", gap: 2 }}>
        <PieChart 
          title="Messages with Emoji"
          width="280px" height="280px"
          label="Percent" 
          legends={false}
          data={{
          "Emoji" : emoji_percent,
          "Non Emoji" : 100 - emoji_percent
          }} 
        />
        <PieChart 
          title="Messages with Punctuation"
          width="280px" height="280px"
          label="Percent" 
          legends={false}
          data={{
          "Punctuation" : punctuated_percent,
          "Non Punctuation" : 100 - punctuated_percent
        }} />
      </Box>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        <HistogramChart 
          labels={hours_active_labels}
          values={hours_active_values}
        />
        <HistogramChart 
          labels={daysOfWeek_active_labels}
          values={daysOfWeek_active_values}
        />
        <HistogramChart 
          labels={months_active_labels}
          values={months_active_values}
        />
      </Box>
    </Box>
  )
}

export default Overview