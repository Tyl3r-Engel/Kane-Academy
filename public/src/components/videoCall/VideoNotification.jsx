import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'
import { Grid, Button, Paper, Box, Typography } from '@mui/material'

export default function VideoNotification() {
  const { answerCall, call, callAccepted } = useContext(VideoCallContext)
  return (
    <>
      {(call.isReceivedCall && !callAccepted) && (
        <Grid container style={{justifyContent: 'center', backgroundColor: '#4F80AD'}}>
          <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
            <Typography variant='h5' gutterBottom>{call.name} is calling</Typography>
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button id='muiPrimary' variant='contained' onClick={answerCall}>
                  accept
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  )
}