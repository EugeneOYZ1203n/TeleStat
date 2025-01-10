import { useState } from 'react'
import './App.css'
import Dropzone from './Components/Dropzone'

function App() {
  const [data, setData] = useState<any>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  const handleSetData = (newData : any) => {
    setIsWaiting(false);
    setData(newData);
  }

  return (
    <>
      {isWaiting 
      ? 
        <Dropzone setParsedJson={handleSetData}/>
      :
        <p>{data.chats.list[0].name}</p>
      }
    </>
  )
}

export default App
