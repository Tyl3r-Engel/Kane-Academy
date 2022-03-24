import React, { useState } from 'react'
import { VideoCallProvider } from '../../context'
import CreateVideoCall from './CreateVideoCall'
import VideoNotification from './VideoNotification'
import VideoPlayer from './VideoPlayer'
import { Modal, Button, Paper } from '@mui/material'

export default function VideoCall() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

  <div>
    <Button onClick={handleOpen}>Open modal</Button>
    {open && (
      <VideoCallProvider>
        <Modal
          open={open}
          onClose={handleClose}
          style={{ overflow:'scroll'}}
        >
          <Paper>
            <VideoPlayer />
            <CreateVideoCall />
            <VideoNotification />
          </Paper>
        </Modal>
      </VideoCallProvider>
    )}
  </div>
  )
}