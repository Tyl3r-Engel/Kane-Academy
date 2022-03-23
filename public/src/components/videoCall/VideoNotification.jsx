import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'

export default function VideoNotification() {
  const { answerCall, call, callAccepted } = useContext(VideoCallContext)
  return (
    <>
      {(call.isReceivedCall && !callAccepted) && (
        <div>
          <h1>{call.name} is calling</h1>
          <button onClick={answerCall}>
            accept
          </button>
        </div>
      )}
    </>
  )
}