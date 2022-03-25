import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'
import { Grid, Typography, Paper } from '@mui/material'

export default function VideoPlayer () {
  const { call, name, callAccepted, callEnded, stream, myVideo, userVideo } = useContext(VideoCallContext)
  return (
    <Grid container style={{ justifyContent: 'center', backgroundColor: '#DDE9F9' }}>
      { stream && (
        <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item md={6}>
            <Typography variant='h5' gutterBottom>{name}</Typography>
            <video style={{width: '500px'}} playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </Paper>
      )}
      { (callAccepted && !callEnded) && (
      <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
        <Grid item md={6}>
          <Typography variant='h5' gutterBottom>{call.name}</Typography>
          <video style={{width: '500px'}} playsInline ref={userVideo} autoPlay />
        </Grid>
      </Paper>
      )}
    </Grid>
  )
}