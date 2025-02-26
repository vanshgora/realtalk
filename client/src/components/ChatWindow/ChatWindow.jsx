import React, { useCallback, useRef, useState } from 'react';
import "react-chat-elements/dist/main.css";
import useWebSocket from 'react-use-websocket';
import { Avatar, Button, Input, MessageBox, Navbar } from 'react-chat-elements';
import './ChatWindow.css';
import { getUser } from '../../services/userServices';
import { prodenv } from '../../config/config'


export default function ChatWindow() {
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const inputRef = useRef(null);
    const user = getUser();
    // wss://realtalk-9lke.onrender.com'
    // wss://realtalk-yqr6.onrender.com
    const ws = useWebSocket(prodenv? 'wss://realtalk-yqr6.onrender.com': 'ws://localhost:3000', {
        onMessage: (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            setMsgList([...msgList, data]);
        }
    });

    const clearInput = () => {
        inputRef.current.value = '';
    }

    const handleClickSendMessage = useCallback(() => {
        ws.sendMessage(JSON.stringify({ message: msg, user_id: user._id }));
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
                                    position={message.user_id === user._id  ? "right" : "left"}
                                    type={"text"}
                                    title={message.user_id === user._id ? "You" : message.username}
                                    text={message.message}
                                    styles={{ color: 'black' }}
                                    className='my-5'
                                    date={new Date()}
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
