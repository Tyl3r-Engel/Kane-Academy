import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Chat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageLog, setMessageLog] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        message: currentMessage,
      };
      await socket.emit('send', messageData);
      setMessageLog((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  socket.on('users', (data) => console.log(data, ' data from emitter'));

  useEffect(() => {
    socket.on('receive', (data) => {
      setMessageLog((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
  
      <div className="chatBody">
        <p>Chat History</p>
      </div>
      <div className="chat-body">
        {messageLog.map((messageContent, index) => {
          return (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? 'you' : 'other'}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatInput">
        <TextField
          id='outlined-basic'
          label='Chat'
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <Button variant='contained' onClick={sendMessage}>&#9658;</Button>
      </div>
    </div>
  );
}
