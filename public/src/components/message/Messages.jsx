import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './chat';

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
          <h3>Chat</h3>
          <input
            type="text"
            placeholder="name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={join}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}
