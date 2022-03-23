import React, { useContext, useState } from 'react'
import { VideoCallContext } from '../../context'

export default function CreateVideoCall () {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(VideoCallContext)
  const [idToCall, setIdToCall] = useState('')
  return (
    <div>
      <form>
        <label>Name
          <input type='text' value={name} onChange={e => setName(e.target.value)}/>
          <span>{me}</span>
        </label>
        <br />
        <label>Make Call
          <input type='text' value={idToCall} onChange={e => setIdToCall(e.target.value)}/>
          {callAccepted && !callEnded ? (
            <button onClick={(e) => {e.preventDefault(); leaveCall()}}>
              leave
            </button>
          ) : (
            <button onClick={(e) => {e.preventDefault(); callUser(idToCall)}}>
              Call
            </button>
          )}
        </label>
      </form>
    </div>
  )
}