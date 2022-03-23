import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'
import { Grid, Button, Paper } from '@mui/material'

export default function VideoNotification() {
  const { answerCall, call, callAccepted } = useContext(VideoCallContext)

  return (
    <>
      {(call.isReceivedCall && !callAccepted) && (
        <Grid container style={{justifyContent: 'center', backgroundColor: '#4F80AD'}}>
          <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
            <h1>{call.name} is calling</h1>
            <Grid item md={3}>
              <Button variant='contained' onClick={answerCall}>
                accept
              </Button>
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  )
}