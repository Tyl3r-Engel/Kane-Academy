import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const AppContext = React.createContext({});

const VideoCallContext = createContext({})
const socket = io('http://localhost:3001/videoCall')

const VideoCallProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideo = useRef()
  const userVideo = useRef(document.createElement('video'))
  const connectionRef = useRef()

  useEffect(() => {
    socket.emit('rendered')
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })
    socket.on('me', id => setMe(id))
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: call.from })
    })
    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream
    })
    peer.signal(call.signal)
    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on('signal', data => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
    })
    peer.on('stream', currentStream => {
      userVideo.current.srcObject = currentStream
    })
    socket.on('callAccepted', signal => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
    window.location.reload()
  }
  return (
    <VideoCallContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall
    }}>
      {children}
    </VideoCallContext.Provider>
  )
}

const SearchContext = createContext({})
const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  function handleOnSearch(event) {
    setQuery(event.target.value);
  }
  return (
    <SearchContext.Provider value={{handleOnSearch, query}}>
      {children}
    </SearchContext.Provider>
  )
}

export {
  AppContext,
  VideoCallContext,
  VideoCallProvider,
  SearchContext,
  SearchProvider,
};