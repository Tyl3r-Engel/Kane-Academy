import React from 'react';
import axios from 'axios';

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
    <button onClick={(e) => logout(e)}>
      Logout
    </button>
  )
}