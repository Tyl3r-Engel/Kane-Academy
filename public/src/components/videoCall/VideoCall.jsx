import React from 'react'
import { VideoCallProvider } from '../../context'
import CreateVideoCall from './CreateVideoCall'
import VideoNotification from './VideoNotification'
import VideoPlayer from './VideoPlayer'

export default function VideoCall() {
  return (
    <VideoCallProvider>
      <VideoPlayer />
      <CreateVideoCall />
      <VideoNotification />
    </VideoCallProvider>
  )
}