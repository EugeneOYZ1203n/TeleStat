import React from 'react'
import { Box, Card } from "@mui/material";
import SmallOverviewCard from '../GraphComponents/SmallOverviewCard';
import BigOverviewCard from '../GraphComponents/BigOverviewCard';


const Overview_BigNumbers = ({data}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap", // Enables wrapping for big numbers
                margin: "auto",
                justifyContent: "center"
            }}
        >
            {/* MSges sent */}
            <SmallOverviewCard items = {[
                {label:"Messages Sent", data:data.overall.messages_sent},
                {label:"Words Sent", data:data.overall.wordCount_sent}
            ]} img="plane" labelWidth='150px'/>
            {/* msgs recieved */}
            <SmallOverviewCard items = {[
                {label:"Msgs Received", data:data.overall.messages_received},
                {label:"Words Received", data:data.overall.wordCount_received}
            ]} img="mailbox" labelWidth='150px'/>
            {/* Date stuff */}
            <BigOverviewCard items = {[
                {label:"First message", data:data.overall.firstDateMessaged},
                {label:"Last message", data:data.overall.lastDateMessaged},
                {label:"Days messaged", data:data.overall.daysBetweenFirstAndLastMessage},
                {label:"Daily messages", data:data.overall.avgDailyMessages},
            ]} img={'calendar'} labelWidth='150px'/>
            {/* sentiment */}
            <SmallOverviewCard items = {[
                {label:"Avg. sentiment", data:data.overall.avg_message_sentiments},
            ]} img={data.overall.avg_message_sentiments < 0 ? 'sad' : 'smile'} labelWidth='160px'/>
            {/* speed */}
            <SmallOverviewCard items = {[
                {label:"Avg. response time", data:data.overall.avgResponseTime},
                {label:"Med. response time", data:data.overall.medianResponseTime}
            ]} img="stopwatch" labelWidth='165px'/>

        </Box>
    )
}

export default Overview_BigNumbers