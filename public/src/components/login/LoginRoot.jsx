import React from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

export default function LoginRoot() {
  const [email, updateEmail] = React.useState('');
  const [password, updatePassword] = React.useState('');
  const [error, updateError] = React.useState('');

  const handleSubmit = (e) => {
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
      <h1 style={{margin: '0 auto', width: '100px'}}>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input
            type="email"
            value={email}
            maxLength={40}
            onChange={(e) => updateEmail(e.target.value)}
            required />
        </label>
        <br />
        <label>
          password:
          <input
            type="password"
            value={password}
            maxLength={255}
            onChange={(e) => updatePassword(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value="Submit" style={{marginLeft: '90px'}}/>
      </form>
      <a className="button google" href="/login/federated/google" style={{marginLeft: '50px'}}>Sign in with Google</a>
      {error && (<ErrorMessage error={error} />)}
    </div>
  );
}
