import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './chat';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const socket = io('http://localhost:3001/chat', {
  autoConnect: false,
  transports: ['websocket'],
});
function join(username, setUsername) {
  let name = username;
  // console.log(name, ' name1');
  if (name === null) {
    name = 'NoBody' + Math.floor(Math.random() * 1000);
    setUsername(name);
  }
  socket.auth = { name };
  socket.connect();
}
export default function Messages() {
  const [username, setUsername] = useState(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="message">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Text Chat</h3>
          <TextField
            id="outlined-basic"
            label="Display Name"
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
          />
          <Button
            id="muiPrimary"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              join(username, setUsername);
              setShowChat(true);
            }}
          >
            Join
          </Button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
        />
      )}
    </div>
  );
}
