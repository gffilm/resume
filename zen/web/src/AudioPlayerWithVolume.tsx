import React, { useEffect, useRef } from 'react'

const AudioPlayerWithVolume = ({ title, videoId, volume }) => {
  const playerRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(script)
  }, [videoId, title])

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume)
    }
  }, [volume])

  const onPlayerReady = (event) => {
    if (playerRef.current && playerRef.current.setVolume) {
      console.log('Playing', title)
      playerRef.current.unMute()
      playerRef.current.setVolume(volume)
      playerRef.current.playVideo()
    }
  }

  const handleIframeLoad = () => {
    setTimeout(() => {
    console.log('Iframe loaded')
      playerRef.current = new window.YT.Player(`player_${videoId}`, {
        videoId,
        playerVars: {
          'autoplay': 1,
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      })
    }, 1000)
  }

  return (
    <div style={{ display: 'none' }}>
      <iframe
        id={`player_${videoId}`}
        type="text/html"
        width="640"
        height="390"
        allow="autoplay"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&playsinline=1&mute=1`}
        frameBorder="0"
        onLoad={handleIframeLoad}
      />
    </div>
  )
}

export default AudioPlayerWithVolume
