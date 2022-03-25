import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Logout() {
  const logout = (e) => {
    e.preventDefault();
    axios.put('/logout')
      .then((results) => {
        window.location = '/login';
      })
      .catch((err) => {
        console.log(err);
        console.log('Cannot Log Out');
      })
  }

  return (
    <Button id='muiPrimary' variant='contained' onClick={(e) => logout(e)}>
      Logout
    </Button>
  )
}