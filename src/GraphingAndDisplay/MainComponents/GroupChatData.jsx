import { Box, Typography } from "@mui/material"
import BigNumber from "../GraphComponents/BigNumber"


const GroupChatData = ({data}) => {
    return (
        <Box sx = {{display: 'flex', flexDirection: 'column'}}>
            <Typography>Group Chat Data</Typography>
            <BigNumber
                number = {data.groupChats.length}
                label = {"Group Chat array length"}
            />
        </Box>
    )
}

export default GroupChatData