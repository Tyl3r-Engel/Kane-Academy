import React from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { FormControl, Button, TextField, Typography } from '@mui/material';
import logo from '../../../dist/kaLogoBlack.png';

export default function LoginRoot() {
  const [email, updateEmail] = React.useState('');
  const [password, updatePassword] = React.useState('');
  const [error, updateError] = React.useState('');

  const handleSubmit = (e) => {
    if (email === '' || password === '') {
      updateError('Please fill in all required fields');
      return;
    }
    e.preventDefault();
    axios.post('/login', {
      email,
      password,
    })
      .then((results) => {
        window.location = '/profile';
      })
      .catch((err) => {
        updateError('Login Failed: Invalid Password or Username');
      });
  };

  return (
    <div style={{margin: '0 auto', width: '250px'}}>
      <img src={logo} style={{'marginTop': '-30px', 'marginBottom': '-30px', 'width': 'auto', 'height': '250px'}}></img>
      <Typography variant="h2" component="div" gutterBottom align="center">Log in</Typography>
      <FormControl fullWidth>
        <TextField
          inputProps={{
            minLength: 1,
            maxLength: 40
          }}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => updateEmail(e.target.value)}
          required />
        <br />
        <TextField
          label="Password"
          type="password"
          width="250px"
          value={password}
          inputProps={{
            minLength: 1,
            maxLength: 255
          }}
          onChange={(e) => updatePassword(e.target.value)}
          required
        />
        <br />
        <Button id='muiPrimary' variant="contained" onClick={handleSubmit}>Submit</Button>
        <br />
        <Button id='muiSecondary' variant="contained" href="/login/federated/google">Sign in with Google</Button>
        <br />
        <Button variant="text" href="/signup">Not registered? Sign Up</Button>
      </FormControl>
      {error && (<ErrorMessage error={error} />)}
    </div>
  );
}
