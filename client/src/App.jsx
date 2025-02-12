import { useCallback, useRef, useState } from 'react'
import './App.css'
import "react-chat-elements/dist/main.css"
import useWebSocket from 'react-use-websocket'
import { Avatar, Button, Input, MessageBox, Navbar } from 'react-chat-elements'

function App() {
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const inputRef = useRef(null);
  const ws = useWebSocket('ws://localhost:3000', {
    onMessage: (message) => {
      setMsgList([...msgList, message.data.toString()]);
    }
  });

  const clearInput = () => {
    inputRef.current.value = '';
  }
  
  const handleClickSendMessage = useCallback(() => {
    ws.sendMessage(msg);
    setMsg('');
    clearInput();
  });

  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="grid bg-gray-500 grid-rows-[70px_1fr_70px] h-full">

          <Navbar
            className='chat-window-nav  p-4'
            left={
              <Avatar
                src="https://avatars.githubusercontent.com/u/80540635?v=4"
                alt="avatar"
                size="xlarge"
                type="rounded"
              />
            }
          />

          <main className="messages-div p-4">
            <ol className="massages h-full">
              {
                msgList.map((message, index) => <MessageBox
                  key={index}
                  position={"left"}
                  type={"text"}
                  title={"Message Box Title"}
                  text={message}
                  styles={{ color: 'black' }}
                  className='my-5'
                />)
              }
            </ol>
          </main>

          <div className="message-form flex flex-row w-full">
            <Input
              placeholder="Type here..."
              multiline={true}
              className='message-input'
              type='text'
              onChange={(e) => setMsg(e.target.value)}
              referance={inputRef}
            />
            <Button text={"Send"} onClick={handleClickSendMessage} title="Send" />
          </div>

        </div>
      </div>

    </>
  )
}

export default App
