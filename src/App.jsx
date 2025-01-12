import { useState } from 'react';
import './App.css';
import Dropzone from './DataHandling/Components/Dropzone';
import LoadingBar from './DataHandling/Components/LoadingBar';
import UsageInfo from './Components/UsageInfo';
import { Box } from '@mui/material';
import { calculateStats } from './DataHandling/CalculateStats';
import DisplayData from './GraphingAndDisplay/MainComponents/DisplayData';
import BigNumber from './GraphingAndDisplay/SubComponents/BigNumber';
import PieChart from './GraphingAndDisplay/SubComponents/PieChart';

function App() {
  const [isWaitingFile, setIsWaitingFile] = useState(true);
  const [isWaitingData, setIsWaitingData] = useState(true);

  const [totalOverall, setTotalOverall] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [overallStatus, setOverallStatus] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const [data, setData] = useState(null);

  const handleSetData = async (newData) => {
    setIsWaitingFile(false);
    setTotalOverall(newData.chats.list.length + 1) // Extra 1 for managing overall stats
    setData(await calculateStats(
      newData.chats.list, 
      (statusMessage, statusProgress) => {
        setStatus(statusMessage)
        setProgress(statusProgress)
      },
      (text, index) => {
        setOverallStatus(text)
        setOverallProgress(index)
      }
    ))
    setIsWaitingData(false);
  }

  return (
    <Box 
      sx={{
        padding: 4,
        margin: "auto",
        width: "80vw",
        height: "80vh",
        textAlign: "center",
        alignContent: "center",
        verticalAlign: "center",
      }}>
      {isWaitingFile 
      ? 
        <>
        <UsageInfo/>
        <Dropzone setParsedJson={handleSetData}/>
        </>
      : isWaitingData
        ?
          <>
            <LoadingBar message={overallStatus} value={overallProgress} total={totalOverall}/>
            <LoadingBar message={status} value={progress} total={100}/>
          </>
        : 
          <DisplayData data={data}/>
      }
    </Box>
  )
}

export default App
