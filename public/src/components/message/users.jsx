import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Users({ socket, selected, setSelected }) {
  const [users, setUsers] = useState([]);

  // console.log(socket, selected, setSelected);

  useEffect(async () => {
    await socket.on('users', (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUsers(users);
    });
  }, [socket]);

  return (
    <div style={{marginBottom: '15px'}}>
      {users.map((user, index) => {
        // console.log(user, 'user list');
        if (selected.userid === user.userID) {
          return (
            <Button
              className={`userID.${user.self}.selected`}
              key={index}
              variant='contained'
              name={user.userID}
              id={selected.userid === user.userID ? 'muiSecondary' : 'muiPrimary'}
              un={user.username}
              onClick={(e) => {
                // console.log(e.target.name);
                e.target.active = true;
                if (selected.active && selected.userid === e.target.name) {
                  setSelected({ active: false, username: '', userid: '' });
                  return;
                }
                setSelected({
                  active: true,
                  username: e.target.un,
                  userid: e.target.name,
                });
                socket.emit('t');
              }}
            >
              {user.username}
              {user.self ? <sub>Self</sub> : null}
            </Button>
          );
        }
        return (
          <Button
            className={`userID.${user.self}`}
            key={index}
            variant='contained'
            name={user.userID}
            un={user.username}
            id={selected.userid === user.userID ? 'muiSecondary' : 'muiPrimary'}
            onClick={(e) => {
              // console.log(e.target.name);
              e.target.active = true;
              if (selected.active && selected.userid === e.target.name) {
                setSelected({ active: false, username: '', userid: '' });
                return;
              }
              setSelected({
                active: true,
                username: e.target.un,
                userid: e.target.name,
              });
              socket.emit('t');
            }}
          >
            {user.username}
            {user.self ? <sub>Self</sub> : null}
          </Button>
        );
      })}
    </div>
  );
}
