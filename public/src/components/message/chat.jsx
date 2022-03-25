 import React, { useState, useEffect } from 'react';
import Users from './users';
import Button from '@mui/material/Button';
import { TextField, Paper, Box } from '@mui/material';

export default function Chat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageLog, setMessageLog] = useState([]);
  const [priId, setPriId] = useState('');
  const [selected, setSelected] = useState({
    active: false,
    username: '',
    userid: '',
  });
  useEffect(() => {
    // console.log(selected, ' selected ', priId);
    if (selected.active) {
      setPriId(selected.userid);
    } else {
      setPriId('');
    }
  }, [selected]);
  const sendMessage = async () => {
    if (currentMessage !== '') {
      // console.log(priId.length);
      if (priId.length > 4) {
        const messageData = {
          author: `sent to ${selected.username} by self`,
          message: currentMessage,
        };
        await socket.emit('private message', {
          author: username,
          message: currentMessage,
          to: priId,
        });
        setMessageLog((list) => [...list, messageData]);
        setCurrentMessage('');
      } else {
        const messageData = {
          author: username,
          message: currentMessage,
        };
        await socket.emit('send', messageData);
        setCurrentMessage('');
      }
    }
  };
  useEffect(async () => {
    await socket.on('receive', (data) => {
      // console.log(data, 'from chat');
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
      <div className="chatInput">
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginBottom: '15px' }}>
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
        <Button id="muiPrimary" variant="contained" onClick={sendMessage} gutterbottom='true'>
          &#9658;
        </Button>
        </Box>
      </div>
      <Users socket={socket} selected={selected} setSelected={setSelected} />
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
    <Paper id='muiSecondary' variant='elevation' elevation={5} sx={{margin: '0 auto', width: '500px'}}>

      <div className="chatBody">
        <p id='muiSecondaryText'>Chat History</p>
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
                  <p><em style={{color: '#4F80AD'}}>{messageContent.author}:</em> {messageContent.message}</p>
                </div>


              </div>
            </div>
          );
        })}
      </div>
    </Paper>


      {/* <TextField
        type="private"
        value={priId}
        placeholder="id..."
        onChange={(event) => {
          setPriId(event.target.value);
        }}
      /> */}
    </Box>
    </div>
  );
}
