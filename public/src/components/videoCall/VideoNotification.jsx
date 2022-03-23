import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'
import { Button } from '@mui/material';

export default function VideoNotification() {
  const { answerCall, call, callAccepted } = useContext(VideoCallContext)
  return (
    <>
      {(call.isReceivedCall && !callAccepted) && (
        <div>
          <h1>{call.name} is calling</h1>
          <Button id='muiPrimary' variant='contained' onClick={answerCall}>
            Accept
          </Button>
        </div>
      )}
    </>
  )
}