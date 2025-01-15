import React from 'react'
import { Box, Card } from "@mui/material";
import BigNumber from '../GraphComponents/BigNumber'

import plane from "../../assets/paper-plane-svgrepo-com.svg";
import mailbox from "../../assets/mailbox-svgrepo-com.svg";
import calendar from "../../assets/calendar-big-svgrepo-com.svg"
import smile from "../../assets/smile-circle-svgrepo-com.svg"
import sad from "../../assets/sad-circle-svgrepo-com.svg"
import stopwatch from "../../assets/stopwatch-svgrepo-com.svg"

const Overview_BigNumbers = ({data}) => {
    const smallBoxWidth = '40%'
    const bigBoxWidth = 'calc(80% + 40px)'
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
            <Box sx={{
                backgroundColor:'#101010',
                border:'1px solid grey',
                width:smallBoxWidth, 
                display: 'flex', // Use flex for horizontal alignment
                alignItems: 'center',
                justifyContent:'center',
                padding:"20px"
                }}
            >
                <img 
                    src={plane}
                    alt="sent Icon" 
                    style={{
                        width: "15%",
                        marginRight: "10%"
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <BigNumber 
                        number={data.overall.messages_sent} label={"Messages Sent"} 
                        numberWidth="10en" labelWidth='150px'
                        height="80px" fontSize={36}
                    />
                    <BigNumber 
                        number={data.overall.wordCount_sent} label={"Words Sent"} 
                        numberWidth="8en" labelWidth='150px'
                        height="80px" fontSize={36}
                    />
                </Box>
            </Box>

            {/* msgs recieved */}
            <Box sx={{
                backgroundColor:'#101010',
                border:'1px solid grey',
                width:smallBoxWidth, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                padding:'20px'
                }}
            >
                <img 
                    src={mailbox}
                    alt="mailbox Icon" 
                    style={{
                        width: "60px",
                        marginRight: "60px"
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <BigNumber 
                number={data.overall.messages_received} label={"Msgs Received"} 
                numberWidth="8en" labelWidth='150px'
                height="80px" fontSize={36}
                />
                <BigNumber 
                    number={data.overall.wordCount_received} label={"Words Received"} 
                    numberWidth="8en" labelWidth='150px'
                    height="80px" fontSize={36}
                />
                </Box>
            </Box>


            {/* Date stuff */}
            <Box sx={{
                backgroundColor:'#101010',
                border:'1px solid grey',
                width:bigBoxWidth, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                padding:'21px'
                }}
            >
                <img 
                    src={calendar}
                    alt="calendar Icon" 
                    style={{
                        width: "60px",
                        marginRight: "30px"
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft:'60px' }}>
                <BigNumber 
                number={data.overall.firstDateMessaged} label={"First message"} 
                numberWidth="8en" labelWidth='150px'
                height="80px" fontSize={36}
                />
                <BigNumber 
                    number={data.overall.lastDateMessaged} label={"Last message"} 
                    numberWidth="8en" labelWidth='150px'
                    height="80px" fontSize={36}
                />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' , marginLeft:'60px', marginRight:'100px' }}>
                <BigNumber 
                number={data.overall.daysBetweenFirstAndLastMessage} label={"Days messsaged"} 
                numberWidth="8en" labelWidth='150px'
                height="80px" fontSize={36}
                />
                <BigNumber 
                    number={data.overall.avgDailyMessages} label={"Daily messages"} 
                    numberWidth="8en" labelWidth='150px'
                    height="80px" fontSize={36}
                />
                </Box>
            </Box>
            {/* sentiment */}
            <Box sx={{
                backgroundColor:'#101010',
                border:'1px solid grey',
                width:smallBoxWidth, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                padding:'20px'
                }}
            >
                <img 
                    src={data.overall.avg_message_sentiments < 0 ? sad : smile}
                    alt="sentiement Icon" 
                    style={{
                        width: "60px",
                        marginRight: "60px"
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <BigNumber 
                number={data.overall.avg_message_sentiments} label={"Average sentiment"} 
                numberWidth="8en" labelWidth='180px'
                height="80px" fontSize={36}
                />
                </Box>
            </Box>
            {/* speed */}
            <Box sx={{
                backgroundColor:'#101010',
                border:'1px solid grey',
                width:smallBoxWidth, 
                display: 'flex', // Use flex for horizontal alignment
                alignItems: 'center',
                justifyContent:'center',
                padding:"20px"
                }}
            >
                <img 
                    src={stopwatch}
                    alt="stopwatch Icon" 
                    style={{
                        width: "60px",
                        marginRight: "60px"
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <BigNumber 
                        number={data.overall.avgResponseTime} label={"Avg. response time"} 
                        numberWidth="10en" labelWidth='180px'
                        height="80px" fontSize={36}
                    />
                    <BigNumber 
                        number={data.overall.medianResponseTime} label={"Med. response time"} 
                        numberWidth="8en" labelWidth='180px'
                        height="80px" fontSize={36}
                    />
                </Box>
            </Box>

        </Box>
    )
}

export default Overview_BigNumbers