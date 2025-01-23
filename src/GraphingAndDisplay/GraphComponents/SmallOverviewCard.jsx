import React from 'react';
import { Box } from '@mui/material';
import BigNumber from '../GraphComponents/BigNumber'
import plane from "../../assets/paper-plane-svgrepo-com.svg";
import mailbox from "../../assets/mailbox-svgrepo-com.svg";
import calendar from "../../assets/calendar-big-svgrepo-com.svg"
import smile from "../../assets/smile-circle-svgrepo-com.svg"
import sad from "../../assets/sad-circle-svgrepo-com.svg"
import stopwatch from "../../assets/stopwatch-svgrepo-com.svg"
import { colors } from '../../config';

const SmallOverviewCard = ({ 
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
    const smallBoxWidth = '40%'
    return (
        <Box sx={{
            backgroundColor:colors.grey1,
            border:'1px solid grey',
            width:smallBoxWidth, 
            display: 'flex', // Use flex for horizontal alignment
            alignItems: 'center',
            justifyContent:'center',
            padding:"20px"
            }}
        >
            <img 
                src={images[img]}
                alt="Icon" 
                style={{
                    maxHeight: '80px',
                    width: "15%",
                    marginRight: "10%"
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((item, index) => (
                    <BigNumber 
                        number={item.data} label={item.label} 
                        numberWidth="10en" labelWidth={labelWidth}
                        height="80px" fontSize={36}
                    />
                ))}
            </Box>
        </Box>
  );
};

export default SmallOverviewCard;
