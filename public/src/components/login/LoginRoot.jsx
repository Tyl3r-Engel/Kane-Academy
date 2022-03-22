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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" value={email} onChange={(e) => updateEmail(e.target.value)} required />
        </label>
        <label>
          password:
          <input type="password" value={password} onChange={(e) => updatePassword(e.target.value)} required />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <a className="button google" href="/login/federated/google">Sign in with Google</a>
    </div>
  );
}
