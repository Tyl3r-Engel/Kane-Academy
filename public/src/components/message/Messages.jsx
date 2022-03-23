import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './chat';

const socket = io('http://localhost:3001/chat', {
  autoConnect: false,
  transports: ['websocket'],
});
function join(username, setUsername) {
  let name = username;
  if (!name) {
    name = 'NoBody' + Math.floor(Math.random() * 1000);
  }
  // console.log(name);
  if (!username) {
    setUsername(name);
  }
  socket.auth = { name };
  socket.connect('http://localhost:3001/chat');
}

export default function Messages() {
  const [username, setUsername] = useState(null);
  // const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="message">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Chat</h3>
          <input
            type="text"
            placeholder="name..."
            onChange={(event) => {
              e.preventDefault();
              setUsername(event.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              join(username, setUsername);
              setShowChat(true);
            }}
          >
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}
