import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Users({ socket }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState({
    active: false,
    userid: '',
  });
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
    <div>
      {users.map((user, index) => {
        return (
          <div
            className={`userID.${user.self}`}
            key={index}
            name={user.userID}
            onClick={(e) => {
              e.target.active = true;
              if (selected.userid === e.target.name) {
                setSelected({ active: false, userid: '' });
                return;
              }
              setSelected({
                active: true,
                userid: e.target.name,
              });
              socket.emit('t')
            }}
          >
            <p>
              {`Username: ${user.username} `} <sub>{`Id: ${user.userID}`}</sub>
            </p>
          </div>
        );
      })}
    </div>
  );
}
