import React from 'react';
import axios from 'axios';

export default function LoginRoot() {
  const [email, updateEmail] = React.useState('');
  const [password, updatePassword] = React.useState('');

  const handleSubmit = (e) => {
    // Note: Add more verification to ensure good inputs
    e.preventDefault();
    axios.post('/login', {
      email,
      password,
    })
      .then((results) => {
        window.location = '/profile';
      })
      .catch((err) => {
        console.log('Login Failed: Try again');
      });
  };

  return (
    <div style={{margin: '0 auto', width: '250px'}}>
      <h1 style={{margin: '0 auto', width: '100px'}}>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" value={email} onChange={(e) => updateEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          password:
          <input type="password" value={password} onChange={(e) => updatePassword(e.target.value)} required />
        </label>
        <br />
        <input type="submit" value="Submit" style={{marginLeft: '90px'}}/>
      </form>
      <a className="button google" href="/login/federated/google" style={{marginLeft: '50px'}}>Sign in with Google</a>
    </div>
  );
}
