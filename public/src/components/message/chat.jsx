import React, { useState, useEffect } from 'react';
import Users from './users';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Chat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [PriMessage, setPriMessage] = useState([]);
  const [messageLog, setMessageLog] = useState([]);
  const [priId, setPriId] = useState('');
  const sendMessage = async () => {
    if (currentMessage !== '') {
      if (priId.length > 4) {
        const messageData = {
          author: username,
          message: currentMessage,
        };
        socket.emit('private message', {
          author: username,
          message: currentMessage,
          to: priId,
        });
        await socket.emit('send', messageData);
        setMessageLog((list) => [...list, messageData]);
        setCurrentMessage('');
      } else {
        const messageData = {
          author: username,
          message: currentMessage,
        };
        await socket.emit('private message', {
          author: username,
          message: currentMessage,
          send: priId,
        });
        setMessageLog((list) => [...list, messageData]);
        setCurrentMessage('');
      }
    }
  };
  useEffect(async () => {
    await socket.on('receive', (data) => {
      setMessageLog((list) => [...list, data]);
    });
    await socket.on('Userconnect', (data) =>
      setMessageLog((list) => [...list, data])
    );
    await socket.on('private message', ({ data }) => {
      // console.log(data);
      let temp = {
        author: 'sent to you by ' + data.author,
        message: data.message,
      };
      setMessageLog((list) => [...list, temp]);
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
                  <p>Message: {messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">
                    <small>{messageContent.author}</small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chatInput">
        <TextField
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <Button id='muiPrimary' variant='contained' onClick={sendMessage}>&#9658;</Button>
      </div>
      <Users socket={socket} />
      <TextField
        type="private"
        value={priId}
        placeholder="id..."
        onChange={(event) => {
          setPriId(event.target.value);
        }}
      />
    </div>
  );
}
