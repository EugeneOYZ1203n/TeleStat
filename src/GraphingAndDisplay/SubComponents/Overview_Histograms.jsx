import React from 'react'
import { Box } from '@mui/material';
import HistogramChart from '../GraphComponents/HistogramChart';
import { hours24_active_labels as hours24_active_labels, daysOfWeek_active_labels, months_active_labels } from '../helper/DataLabels';

const Overview_Histograms = ({data}) => {
    const hours_active_values = hours24_active_labels.map((_, i)=>data.overall.hours_active[i] || 0)
    const daysOfWeek_active_values = daysOfWeek_active_labels.map((el)=>data.overall.daysOfWeek_active[el] || 0)
    const months_active_values = months_active_labels.map((_, i)=>data.overall.month_active[i + 1] || 0)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}>
            <HistogramChart 
            title="Active Hours"
            labels={hours24_active_labels}
            values={hours_active_values}
            />
            <HistogramChart 
            title="Active Days of Week"
            labels={daysOfWeek_active_labels}
            values={daysOfWeek_active_values}
            />
            <HistogramChart 
            title="Active Months"
            labels={months_active_labels}
            values={months_active_values}
            />
        </Box>
    )
}

export default Overview_Histograms