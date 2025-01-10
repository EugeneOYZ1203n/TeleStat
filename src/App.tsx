import { useState } from 'react'
import './App.css'
import Dropzone from './Components/Dropzone'
import LoadingBar from './Components/LoadingBar';
import { Box } from '@mui/material';
import { calculateStats } from './DataHandling/CalculateStats';

function App() {
  const [isWaitingFile, setIsWaitingFile] = useState<boolean>(true);
  const [isWaitingData, setIsWaitingData] = useState<boolean>(true);

  const [totalChats, setTotalChats] = useState<number>(0);
  const [chatProgress, setChatProgress] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const [data, setData] = useState<any>(null);

  const handleSetData = async (newData : any) => {
    setIsWaitingFile(false);
    setTotalChats(newData.chats.list.length)
    setData(await calculateStats(
      newData.chats.list, 
      (statusMessage, statusProgress) => {
        setStatus(statusMessage)
        setProgress(statusProgress)
      },
      (index) => {
        setChatProgress(index)
      }
    ))
    setIsWaitingData(false);
  }

  return (
    <Box 
      sx={{
        padding: 8,
        margin: "auto",
        width: "80vw",
        height: "80vh",
        textAlign: "center",
        alignContent: "center",
        verticalAlign: "center",
      }}>
      {isWaitingFile 
      ? 
        <Dropzone setParsedJson={handleSetData}/>
      :
        <>
          <LoadingBar message={"Calculating Stats for each Chat"} value={chatProgress} total={totalChats}/>
          <LoadingBar message={status} value={progress} total={100}/>
        </>
      }
    </Box>
  )
}

export default App
