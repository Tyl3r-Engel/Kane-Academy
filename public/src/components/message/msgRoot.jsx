import React from 'react';
import NavBar from '../shared/navBar';
import VideoCall from '../videoCall/VideoCall';
import Messages from './Messages';

export default function MsgRoot() {
  return (
    <div>
      <NavBar />
      <Messages />
      <VideoCall />
    </div>
  )
}