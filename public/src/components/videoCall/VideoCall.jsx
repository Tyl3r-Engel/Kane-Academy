import React, { useState } from 'react'
import { VideoCallProvider } from '../../context'
import CreateVideoCall from './CreateVideoCall'
import VideoNotification from './VideoNotification'
import VideoPlayer from './VideoPlayer'
import { Modal, Button, Paper } from '@mui/material'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

export default function VideoCall() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} title='Video Call'>
        <VideoCameraFrontIcon sx={{color: '#4F80AD'}}></VideoCameraFrontIcon>
      </Button>
      {open && (
        <VideoCallProvider>
          <Modal
            open={open}
            onClose={handleClose}
            style={{ overflow:'scroll'}}
          >
            <Paper>
              <VideoPlayer />
              <CreateVideoCall args={handleClose}/>
              <VideoNotification />
            </Paper>
          </Modal>
        </VideoCallProvider>
      )}
    </>
  )
}