import { use, useState } from 'react';
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
import ChatSelector from './DataHandling/Components/ChatSelector';
import { GetValidChats } from './DataHandling/GetValidChats';
import DownloadButton from './DataExportImport/Components/DownloadButton';

function App() {
  const [processStatus, setProcessStatus] = useState("Waiting Input")

  const [overallProgress, setOverallProgress] = useState(0);
  const [overallStatus, setOverallStatus] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const [rawData, setRawData] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [data, setData] = useState(null);

  const [options, setOptions] = useState({
    numChats : 5,
  })
  const [selectedChats, setSelectedChats] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const handleTelegramExportData = async (newData) => {
    setProcessStatus("Waiting Parse");
    const chatNames = GetValidChats(newData.chats.list);
    setSelectedChats(chatNames)
    setAllChats(merge(allChats, chatNames))
    setRawData(newData)
  }

  const handleSavedData = async (newData) => {
    setProcessStatus("Waiting Parse");
    const chatNames = newData.chats.map(el=>el.name);
    setSelectedChats(chatNames)
    setAllChats(merge(allChats, chatNames))
    setSavedData(newData)
  }

  const handleParseData = async () => {
    setProcessStatus("Parsing Data");

    if (!!rawData) {
      setData(await calculateStats(
        rawData.chats.list, 
        options,
        selectedChats,
        savedData,
        (statusMessage, statusProgress) => {
          setStatus(statusMessage)
          setProgress(statusProgress)
        },
        (text, index) => {
          setOverallStatus(text)
          setOverallProgress(index)
        }
      ))
    } else {
      setData(savedData)
    }
    
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
          <Dropzone setTelegramExportData={handleTelegramExportData} setSavedData={handleSavedData}/>
          <ParseDataButton handleParseData={handleParseData} disabled={processStatus == "Waiting Input"}/>
          {allChats.length > 0 && <ChatSelector 
            chatNames={allChats} selectedChats={selectedChats} setSelectedChats={setSelectedChats}
          />}
        </>
      : processStatus == "Parsing Data"
        ?
          <>
            <LoadingBar message={overallStatus} value={overallProgress} total={selectedChats.length}/>
            <LoadingBar message={status} value={progress} total={100}/>
          </>
        : 
          <>
            <DownloadButton data={data}/>
            <DisplayData data={data}/>
          </>
      }
    </Box>
  )
}

export default App

const merge = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}