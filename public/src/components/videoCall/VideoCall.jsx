import React, { useState } from 'react'
import { VideoCallProvider } from '../../context'
import CreateVideoCall from './CreateVideoCall'
import VideoNotification from './VideoNotification'
import VideoPlayer from './VideoPlayer'
import { Modal, Button, Paper } from '@mui/material'

export default function VideoCall() {
  return (
    <VideoCallProvider>
      <VideoPlayer />
      <CreateVideoCall />
      <VideoNotification />
    </VideoCallProvider>
  )
}