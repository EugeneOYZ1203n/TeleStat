import React from 'react';
import { Box } from '@mui/material';
import BigNumber from '../GraphComponents/BigNumber'
import plane from "../../assets/paper-plane-svgrepo-com.svg";
import mailbox from "../../assets/mailbox-svgrepo-com.svg";
import calendar from "../../assets/calendar-big-svgrepo-com.svg"
import smile from "../../assets/smile-circle-svgrepo-com.svg"
import sad from "../../assets/sad-circle-svgrepo-com.svg"
import stopwatch from "../../assets/stopwatch-svgrepo-com.svg"

const BigOverviewCard = ({ 
    items,
    img,
    labelWidth
}) => {
    
    const images = {
        'plane':plane,
        'mailbox':mailbox,
        'calendar':calendar,
        'smile':smile,
        'sad':sad,
        'stopwatch':stopwatch,
    }
    const bigBoxWidth = 'calc(80% + 40px)'
    return (
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
                src={images[img]}
                alt="Icon" 
                style={{
                    width: "60px",
                    marginRight: "30px"
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft:'60px' }}>
            {items.slice(0, 2).map((item, index) => (
                    <BigNumber 
                        number={item.data} label={item.label} 
                        numberWidth="10en" labelWidth={labelWidth}
                        height="80px" fontSize={36}
                    />
                ))}
            {/* <BigNumber 
            number={data.overall.firstDateMessaged} label={"First message"} 
            numberWidth="8en" labelWidth='150px'
            height="80px" fontSize={36}
            />
            <BigNumber 
                number={data.overall.lastDateMessaged} label={"Last message"} 
                numberWidth="8en" labelWidth='150px'
                height="80px" fontSize={36}
            /> */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' , marginLeft:'60px', marginRight:'100px' }}>
            {items.slice(2).map((item, index) => (
                    <BigNumber 
                        number={item.data} label={item.label} 
                        numberWidth="10en" labelWidth={labelWidth}
                        height="80px" fontSize={36}
                    />
                ))}
            {/* <BigNumber 
            number={data.overall.daysBetweenFirstAndLastMessage} label={"Days messsaged"} 
            numberWidth="8en" labelWidth='150px'
            height="80px" fontSize={36}
            />
            <BigNumber 
                number={data.overall.avgDailyMessages} label={"Daily messages"} 
                numberWidth="8en" labelWidth='150px'
                height="80px" fontSize={36}
            /> */}
            </Box>
        </Box>
  );
};

export default BigOverviewCard;
