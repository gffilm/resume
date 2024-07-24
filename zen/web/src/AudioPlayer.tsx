import React, { useEffect, useRef } from 'react'

const AudioPlayer = ({ title, videoId }) => {
  const hasLogged = useRef(false)

  useEffect(() => {
    if (!hasLogged.current) {
      console.log('Playing', title)
      hasLogged.current = true
    }
  }, [title])

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&autopause=0`
  return <iframe src={src} allow="autoplay" style={{ display: 'none' }}></iframe>
}

export default AudioPlayer
