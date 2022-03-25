import React from 'react';
import NavBar from '../shared/navBar';
import VideoCall from '../videoCall/VideoCall';
import Messages from './Messages';
import { Container } from '@mui/material';

export default function MsgRoot() {
  return (
    <div>
    <NavBar />
    <Container sizes='xl' sx={{textAlign: 'center'}}>
      <VideoCall />
      <Messages />
    </Container>
    </div>
  );
}
