import React, { useContext, useState } from 'react'
import { VideoCallContext } from '../../context'
import { Grid, Typography, Paper, Button, TextField} from '@mui/material'

export default function CreateVideoCall () {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(VideoCallContext)
  const [idToCall, setIdToCall] = useState('')
  return (
    <Grid container style={{justifyContent: 'center', backgroundColor: '#C0A0CA'}}>
      <form>
        <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item>
            <TextField id='outline-basic' label='Display Name' value={name} onChange={e => setName(e.target.value)}/>
            <span>{me}</span>
          </Grid>
        </Paper>
        <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item>
            <TextField id='outline-basic' label='Make Call' value={idToCall} onChange={e => setIdToCall(e.target.value)}/>
            {callAccepted && !callEnded ? (
              <Button id='muiPrimary' variant='contained' onClick={(e) => {e.preventDefault(); leaveCall()}}>
                Leave
              </Button>
            ) : (
              <Button id='muiPrimary' variant='contained' onClick={(e) => {e.preventDefault(); callUser(idToCall)}}>
                Call
              </Button>
            )}
          </Grid>
        </Paper>
      </form>
    </Grid>
  )
}