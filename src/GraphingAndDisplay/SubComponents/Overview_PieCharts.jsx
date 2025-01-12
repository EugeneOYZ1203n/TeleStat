import React from 'react'
import { Box } from '@mui/material'
import PieChart from '../GraphComponents/PieChart'

const Overview_PieCharts = ({data}) => {
    const emoji_percent = Math.round(data.overall.emoji_percent*1000)/10
    const punctuated_percent = Math.round(data.overall.punctuated_percent*1000)/10

    const messages_dist = data.chats.reduce((acc, el) => {
        return {...acc, [el.name] : [el.messages_total]}
    }, {})
    const words_dist = data.chats.reduce((acc, el) => {
        return {...acc, [el.name] : [el.wordCount_total]}
    }, {})

    const size = "20%"

    return (
        <Box sx={{ display: "flex", justifyContent:"space-evenly", alignItems:"flex-end", padding: 4 }}>
            <PieChart 
                title="Msgs with Emoji"
                width={size}
                label="Percent" 
                legends={false}
                data={{
                    "Emoji" : emoji_percent,
                    "Non Emoji" : 100 - emoji_percent
                }} 
            />
            <PieChart 
                title="Msgs with Punctuation"
                width={size}
                label="Percent" 
                legends={false}
                data={{
                    "Punctuation" : punctuated_percent,
                    "Non Punctuation" : 100 - punctuated_percent
                }} 
            />

            <PieChart 
                title="Messages Dist."
                width={size}
                label="Messages" 
                legends={false}
                data={messages_dist} 
            />

            <PieChart 
                title="Word Dist."
                width={size}
                label="Words" 
                legends={false}
                data={words_dist} 
            />
        </Box>
    )
}

export default Overview_PieCharts