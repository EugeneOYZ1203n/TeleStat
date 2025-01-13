import React from 'react'
import { Box } from '@mui/material';
import HistogramChart from '../GraphComponents/HistogramChart';

const Overview_Histograms = ({data}) => {
    const hours_active_labels = Array.from({ length: 24 }, (_, i) => i);
    const hours_active_values = hours_active_labels.map((el)=>data.overall.hours_active[el] || 0)

    const daysOfWeek_active_labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const daysOfWeek_active_values = daysOfWeek_active_labels.map((el)=>data.overall.daysOfWeek_active[el] || 0)

    const months_active_labels = Array.from({ length: 12 }, (_, i) => 1+i);
    const months_active_values = months_active_labels.map((el)=>data.overall.month_active[el] || 0)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}>
            <HistogramChart 
            title="Active Hours"
            labels={hours_active_labels}
            values={hours_active_values}
            />
            <HistogramChart 
            title="Active Days of Week"
            labels={daysOfWeek_active_labels}
            values={daysOfWeek_active_values}
            />
            <HistogramChart 
            title="Active months"
            labels={months_active_labels}
            values={months_active_values}
            />
        </Box>
    )
}

export default Overview_Histograms