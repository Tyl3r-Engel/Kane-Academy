import React from 'react';
import axios from 'axios';
import VideoCall from '../videoCall/VideoCall';

export default function HomeRoot() {
  return (
    <div>
      <div>Rendered Home</div>
      <VideoCall />
    </div>
  );
}
