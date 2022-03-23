import React, { useContext, useState } from 'react'
import { VideoCallContext } from '../../context'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function CreateVideoCall () {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(VideoCallContext)
  const [idToCall, setIdToCall] = useState('')
  return (
    <div>
      <h3>Video Chat</h3>
      <form>
          <TextField id='outline-basic' label='Display Name' value={name} onChange={e => setName(e.target.value)}/>
          <span>{me}</span>
        <br />
        <br />

          <TextField id='outline-basic' label='Make Call' value={idToCall} onChange={e => setIdToCall(e.target.value)}/>
          {callAccepted && !callEnded ? (
            <Button variant='contained' onClick={(e) => {e.preventDefault(); leaveCall()}}>
              Leave
            </Button>
          ) : (
            <Button variant='contained' onClick={(e) => {e.preventDefault(); callUser(idToCall)}}>
              Call
            </Button>
          )}
      </form>
    </div>
  )
}