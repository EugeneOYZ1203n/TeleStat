import { useState } from 'react'
import './App.css'
import Dropzone from './Components/Dropzone'
import LoadingBar from './Components/LoadingBar';
import { Box } from '@mui/material';
import { calculateStats } from './DataHandling/CalculateStats';

function App() {
  const [isWaitingFile, setIsWaitingFile] = useState(true);
  const [isWaitingData, setIsWaitingData] = useState(true);

  const [totalChats, setTotalChats] = useState(0);
  const [chatProgress, setChatProgress] = useState(0);
  const [currentChatName, setCurrentChatName] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const [data, setData] = useState(null);

  const handleSetData = async (newData) => {
    setIsWaitingFile(false);
    setTotalChats(newData.chats.list.length)
    setData(await calculateStats(
      newData.chats.list, 
      (statusMessage, statusProgress) => {
        setStatus(statusMessage)
        setProgress(statusProgress)
      },
      (index) => {
        setCurrentChatName(
          index < newData.chats.list.length 
            ? newData.chats.list[index].name 
            : "")
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
      : isWaitingData
        ?
          <>
            <LoadingBar message={`Calculating Stats for ${currentChatName}`} value={chatProgress} total={totalChats}/>
            <LoadingBar message={status} value={progress} total={100}/>
          </>
        : 
          <p>{JSON.stringify(data)}</p>
      }
    </Box>
  )
}

export default App
