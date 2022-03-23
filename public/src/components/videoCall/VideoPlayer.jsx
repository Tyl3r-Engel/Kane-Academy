import React, { useContext } from 'react'
import { VideoCallContext } from '../../context'

export default function VideoPlayer () {
  const { call, callAccepted, callEnded, stream, myVideo, userVideo } = useContext(VideoCallContext)
  return (
    <div>
      { stream && (
        <div>ME
          <video style={{width: '500px'}} playsInline muted ref={myVideo} autoPlay />
        </div>

      )}
      { (callAccepted && !callEnded) && (
        <div>{call.name}
          <video style={{width: '500px'}} playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  )
}