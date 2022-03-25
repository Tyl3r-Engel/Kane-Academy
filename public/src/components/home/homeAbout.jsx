import React from 'react';
import { Typography, Paper } from '@mui/material';
import kaLogoBlack from '../../../dist/kaLogoBlack.png'

export default function homeAbout() {
  return (
    <Paper
      id='muiPrimary'
      elevation={3}
      variant='elevation'
      sx={{padding: '15px'}}
    >
      <img src={kaLogoBlack} alt='KA Logo Black' width='200px' height='200px' style={{marginTop: '-50px', marginBottom: '-50px'}}></img>
      <Typography>KaneAcademy is a groundbreaking app that aims to redefine what it means to learn and connect. When you dive into the
      KaneAcademy metaverse, you are immersed in a new world that allows you to achieve your goals and grow your network dynamically.
      Go ahead, look inside yourself and determine your innermost desire. Once you've got that, stick it in the search bar and find
      the path that leads to the new you.</Typography>
    </Paper>
  )
}
