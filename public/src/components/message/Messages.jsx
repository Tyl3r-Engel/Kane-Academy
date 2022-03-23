import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './chat';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const socket = io.connect('http://localhost:3001', { autoConnect: false });

export default function Messages() {
  const [username, setUsername] = useState(null);
  // const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const join = (e) => {
    e.preventDefault();
    socket.userName = username;
    if (!username) {
      setUsername('NoBody' + Math.floor(Math.random() * 1000));
    }
    socket.connect();
    setShowChat(true);
  };

  return (
    <div className="message">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Text Chat</h3>
          <TextField
            id='outlined-basic'
            label="Display Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Button variant='contained' onClick={join}>Join</Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}
