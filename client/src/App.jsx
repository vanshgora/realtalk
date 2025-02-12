import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "react-chat-elements/dist/main.css"
import useWebSocket from 'react-use-websocket'

function App() {
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const ws = useWebSocket('ws://localhost:3000', {
    onMessage: (message) => {
      console.log('Received:', message.data);
      setMsgList([...msgList, message.data.toString()]);
    }
  });
  // const handleClickSendMessage = useCallback(() => ws.sendMessage(msg), []);

  return (
    <>
      <form>
        <input type="text" name="chat" placeholder="Write Something" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          ws.sendMessage(msg);
        }
        }>Send</button>
      </form>
      <div className="messages-div">
        <ol className="massages">
          {
            msgList.map((message, index) => <li className='message' key={index}>{message}</li>)
          }
        </ol>
      </div>
    </>
  )
}

export default App
