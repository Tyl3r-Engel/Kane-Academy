import React from 'react';
import { Typography } from '@mui/material';

export default function ErrorMessage({ error }) {
  return (
    <Typography variant="subtitle1" component="div" gutterBottom align="center" color="red">
      {error}
    </Typography>
  );
}
