import React from 'react'
import { Box, Card, Grid2 } from "@mui/material";
import SmallOverviewCard from '../GraphComponents/SmallOverviewCard';
import BigOverviewCard from '../GraphComponents/BigOverviewCard';


const Overview_BigNumbers = ({data}) => {
    return (
        <Grid2 container spacing = {0}>
            <Grid2 size ={{ xs:12, md:6}}>
                {/* MSges sent */}
                <SmallOverviewCard items = {[
                    {label:"Messages Sent", data:data.overall.messages_sent},
                    {label:"Words Sent", data:data.overall.wordCount_sent}
                ]} img="plane" labelWidth='150px'/>
            </Grid2>
            <Grid2 size ={{ xs:12, md:6}}>
                {/* msgs recieved */}
                <SmallOverviewCard items = {[
                    {label:"Msgs Received", data:data.overall.messages_received},
                    {label:"Words Received", data:data.overall.wordCount_received}
                ]} img="mailbox" labelWidth='150px'/>            
            </Grid2>
            <Grid2 size ={{ xs:12, md:6}}>
                {/* Date stuff */}
                <SmallOverviewCard items = {[
                    {label:"First message", data:data.overall.firstDateMessaged},
                    {label:"Last message", data:data.overall.lastDateMessaged}
                ]} img={'calendar'} labelWidth='150px'/>               
            </Grid2>
            <Grid2 size ={{ xs:12, md:6}}>
                {/* Even more date stuff */}
                <SmallOverviewCard items = {[
                    {label:"Days messaged", data:data.overall.daysBetweenFirstAndLastMessage},
                    {label:"Daily messages", data:data.overall.avgDailyMessages}
                ]} img={'day'} labelWidth='150px'/>
            </Grid2>
            <Grid2 size ={{ xs:12, md:6}}>
                {/* sentiment */}
                <SmallOverviewCard items = {[
                    {label:"Avg. sentiment", data:data.overall.avg_message_sentiments},
                ]} img={data.overall.avg_message_sentiments < 0 ? 'sad' : 'smile'} labelWidth='160px'/>               
            </Grid2>
                <Grid2 size ={{ xs:12, md:6}}>
                {/* speed */}
                <SmallOverviewCard items = {[
                    {label:"Avg. response time", data:data.overall.avgResponseTime},
                    {label:"Med. response time", data:data.overall.medianResponseTime}
                ]} img="stopwatch" labelWidth='165px'/>
            </Grid2>
        </Grid2>
    )
}

export default Overview_BigNumbers