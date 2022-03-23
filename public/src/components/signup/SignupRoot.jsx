import React from 'react';
import axios from 'axios';

export default function SignupRoot() {
  const [mentor, updateMentor] = React.useState(false);
  const [firstName, updateFirstName] = React.useState('');
  const [lastName, updateLastName] = React.useState('');
  const [email, updateEmail] = React.useState('');
  const [password, updatePassword] = React.useState('');

  const handleSubmit = (e) => {
    // Note: Add more verification to ensure good inputs
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
        console.log('Signup Failed: Try again');
      });
  };

  return (
    <div style={{margin: '0 auto', width: '250px'}}>
      <h1 style={{margin: '0 auto', width: '125px'}}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label style={{marginLeft: '40px'}}>
          Mentor:
          <input
            type="radio"
            value={true}
            name="mentor"
            checked={mentor === true}
            onChange={() => updateMentor(true)}
          />
          Learner:
          <input
            type="radio"
            value={false}
            name="mentor"
            checked={mentor === false}
            onChange={() => updateMentor(false)}
          />
        </label>
        <br/>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => updateFirstName(e.target.value)} required />
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => updateLastName(e.target.value)} required />
        </label>
        <br/>
        <label>
          email:
          <input type="email" value={email} onChange={(e) => updateEmail(e.target.value)} required />
        </label>
        <br/>
        <label>
          password:
          <input type="password" value={password} onChange={(e) => updatePassword(e.target.value)} required />
        </label>
        <br/>
        <input type="submit" value="Submit" style={{marginLeft: '90px'}}/>
      </form>
      <a className="button google" href="/login/federated/google" style={{marginLeft: '50px'}}>Sign Up with Google</a>
    </div>
  );
}
