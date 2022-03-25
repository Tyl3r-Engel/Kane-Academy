import React, { useContext, useState, useEffect } from 'react'
import { VideoCallContext } from '../../context'
import { Grid, Paper, Button, Box, TextField} from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import requestFirstName from '../profile/axios/requestFirstName'
import requestCurrentSession from '../profile/axios/requestCurrentSession'

export default function CreateVideoCall ({ args: close }) {
  const { me, callAccepted, setName, callEnded, leaveCall, callUser} = useContext(VideoCallContext)
  const [idToCall, setIdToCall] = useState('')

  useEffect(() => {
    requestCurrentSession((result) => {
      result[0].sess.replace('/', '')
      result[0].sess.replace("\"", '')
      requestFirstName(
        JSON.parse(result[0].sess).passport.user.id,
        data => setName(data)
      )
    })
  }, [])

  return (
    <Grid container style={{justifyContent: 'center', backgroundColor: '#C0A0CA'}}>
      <form>
        <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Button
              id='muiPrimary'
              variant='contained'
              title='Copy call ID'
              onClick={(event) => {
                navigator.clipboard.writeText(me)
                event.target.innerText = 'Copied!'
                }}
                >
                {me}
              </Button>
            </Box>
          </Grid>
        </Paper>
        <Paper style={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
              <TextField autoComplete="off" label='Make Call' value={idToCall} onChange={e => setIdToCall(e.target.value)}/>
              {callAccepted && !callEnded ? (
                <Button id='muiPrimary' variant='contained' onClick={(e) => {e.preventDefault(); leaveCall()}}>
                  Leave
                </Button>
              ) : (
                <Button id='muiPrimary' variant='contained' onClick={(e) => {e.preventDefault(); callUser(idToCall)}}>
                  Call
                </Button>
              )}
            </Box>
          </Grid>
        </Paper>
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Button
            id='muiPrimary'
            variant='contained'
            title='CLOSE'
            onClick={close}
            >
              <CancelPresentationIcon></CancelPresentationIcon>
            </Button>
          </Box>
        </Grid>
      </form>
    </Grid>
  )
}