import { useState } from 'react';
import './App.css';
import './GraphingAndDisplay/helper/ChartSetup'
import Dropzone from './DataHandling/Components/Dropzone';
import LoadingBar from './DataHandling/Components/LoadingBar';
import UsageInfo from './DataHandling/Components/UsageInfo';
import { Box } from '@mui/material';
import { calculateStats } from './DataHandling/CalculateStats';
import DisplayData from './GraphingAndDisplay/MainComponents/DisplayData';
import OptionsTab from './DataHandling/Components/OptionsTab';
import ParseDataButton from './DataHandling/Components/ParseDataButton';

function App() {
  const [processStatus, setProcessStatus] = useState("Waiting Input")

  const [totalOverall, setTotalOverall] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [overallStatus, setOverallStatus] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const [rawData, setRawData] = useState(null);
  const [data, setData] = useState(null);

  const [options, setOptions] = useState({
    numChats : 5,
  })

  const handleSetData = async (newData) => {
    setProcessStatus("Waiting Parse");
    setTotalOverall(newData.chats.list.length + 1) // Extra 1 for managing overall stats
    setRawData(newData);
  }

  const handleParseData = async () => {
    setProcessStatus("Parsing Data");
    setData(await calculateStats(
      rawData.chats.list, 
      options.numChats,
      (statusMessage, statusProgress) => {
        setStatus(statusMessage)
        setProgress(statusProgress)
      },
      (text, index) => {
        setOverallStatus(text)
        setOverallProgress(index)
      }
    ))
    setProcessStatus("Finish Parsing");
  }

  return (
    <Box 
      sx={{
        padding: 4,
        margin: "auto",
        paddingBottom: 12,
        width: "80vw",
        minHeight: "80vh",
        textAlign: "center",
        alignContent: "center",
        verticalAlign: "center",
      }}>
      {processStatus == "Waiting Input" || processStatus == "Waiting Parse"
      ? 
        <>
          <UsageInfo/>
          <Dropzone setParsedJson={handleSetData}/>
          <ParseDataButton handleParseData={handleParseData} disabled={processStatus == "Waiting Input"}/>
          <OptionsTab options={options} setOptions={setOptions}/>
        </>
      : processStatus == "Parsing Data"
        ?
          <>
            <LoadingBar message={overallStatus} value={overallProgress} total={Math.min(totalOverall, options.numChats)}/>
            <LoadingBar message={status} value={progress} total={100}/>
          </>
        : 
          <DisplayData data={data}/>
      }
    </Box>
  )
}

export default App
