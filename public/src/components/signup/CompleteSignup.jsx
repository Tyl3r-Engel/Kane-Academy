import React from 'react';
import axios from 'axios';

export default function CompleteSignup() {
  const [mentor, updateMentor] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      mentor,
    };
    axios.post('/signup/complete', body)
      .then((results) => {
        window.location = '/';
      })
      .catch((err) => {
        console.log('Signup Failed: Try again');
      });
  };

  return (
    <div style={{margin: '0 auto', width: '300px'}}>
      <h1 style={{margin: '0 auto', width: '270px'}} >Complete Sign Up:</h1>
      <form onSubmit={handleSubmit} style={{marginLeft: '60px'}}>
        <label>
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
        <input type="submit" value="Submit" style={{marginLeft: '50px'}}/>
      </form>
    </div>
  );
}
