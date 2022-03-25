import React from 'react';
import axios from 'axios';
import ErrorMessage from '../login/ErrorMessage';
import { FormControl, Button, Radio, Typography, FormLabel, FormControlLabel, TextField } from '@mui/material';
import logo from '../../../dist/kaLogoBlack.png';

export default function SignupRoot() {
  const [mentor, updateMentor] = React.useState(false);
  const [firstName, updateFirstName] = React.useState('');
  const [lastName, updateLastName] = React.useState('');
  const [email, updateEmail] = React.useState('');
  const [password, updatePassword] = React.useState('');
  const [error, updateError] = React.useState('');

  const handleSubmit = (e) => {
    // Note: Add more verification to ensure good inputs
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === '' || password === '' || firstName === '' || lastName === '') {
      updateError('Please fill in all required fields');
      return;
    } else if (!email.match(regexEmail)) {
      updateError('Please use a valid email address');
      return;
    }
    e.preventDefault();
    const body = {
      mentor,
      firstName,
      lastName,
      email,
      password,
    };
    axios.post('/signup', body)
      .then((results) => {
        window.location = '/';
      })
      .catch((err) => {
        updateError('Signup Failed: Email already registered');
      });
  };

  return (
    <div style={{margin: '0 auto', width: '250px'}}>
    <img src={logo} style={{'marginTop': '-30px', 'marginBottom': '-30px', 'width': 'auto', 'height': '250px'}}></img>
      <Typography variant="h2" component="div" gutterBottom align="center">Sign Up</Typography>
      <FormControl fullWidth align="center">
        <FormLabel>Account Type</FormLabel>
          <FormControlLabel
            value="true"
            label="Mentor"
            control={(
              <Radio
                type="radio"
                value={true}
                label="mentor"
                checked={mentor === true}
                onChange={() => updateMentor(true)}
              />
            )}
          />
          <FormControlLabel
            value="true"
            label="Learner"
            control={(
              <Radio
                type="radio"
                value={false}
                label="learner"
                checked={mentor === false}
                onChange={() => updateMentor(false)}
              />
            )}
          />
        <br/>
        <TextField
          label="First Name"
          type="text"
          value={firstName}
          inputProps={{
            minLength: 1,
            maxLength: 25
          }}
          onChange={(e) => updateFirstName(e.target.value)}
          required />
        <br/>
        <TextField
          label="Last Name"
          type="text"
          value={lastName}
          inputProps={{
            minLength: 1,
            maxLength: 25
          }}
          onChange={(e) => updateLastName(e.target.value)}
          required />
        <br/>
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
        <Button variant="text" href="/login">already registered? Log in</Button>
      </FormControl>
      {error && (<ErrorMessage error={error} />)}
    </div>
  );
}
