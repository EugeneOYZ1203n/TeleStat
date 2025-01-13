import React from 'react'
import { Box } from "@mui/material";
import BigNumber from '../GraphComponents/BigNumber'

const Overview_BigNumbers = ({data}) => {
    const bigNumbers = [
        {label: "Msgs Sent", number: data.overall.messages_sent},
        {label: "Msgs Received", number: data.overall.messages_received},
        {label: "Words Sent", number: data.overall.wordCount_sent},
        {label: "Words Received", number: data.overall.wordCount_received},
        {label: "Words Per Msg", number: data.overall.avgWordCountPerMessageSent},
        {label: "Days Msged", number: data.overall.daysBetweenFirstAndLastMessage},
        {label: "First Msg", number: data.overall.firstDateMessaged},
        {label: "Last Msg", number: data.overall.lastDateMessaged},
        {label: "Daily Msgs", number: data.overall.avgDailyMessages},
        {label: "Avg Sentiment", number: data.overall.avg_message_sentiments},
        {label: "Avg Reply Time (s)", number: data.overall.avgResponseTime},
        {label: "Med. Reply Time (s)", number: data.overall.medianResponseTime}
    ]

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap", // Enables wrapping for big numbers
                margin: "auto",
                justifyContent: "space-evenly"
            }}
        >
            {bigNumbers.map((item, index) => (
            <BigNumber 
                key={index} number={item.number} label={item.label} 
                numberWidth="8en" labelWidth='100px'
                height="80px" fontSize={36}
            />
            ))}
        </Box>
    )
}

export default Overview_BigNumbers