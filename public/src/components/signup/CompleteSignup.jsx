import React from 'react';
import axios from 'axios';
import { FormControl, Button, Radio, RadioGroup, Typography, FormLabel, FormControlLabel } from '@mui/material';

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
      <Typography variant="h2" component="div" gutterBottom align="center">Complete Sign Up:</Typography>
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
        <Button id='muiPrimary' variant="contained" onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </div>
  );
}
