import React, { useEffect, useRef } from 'react'

const AudioPlayerWithVolume = ({ title, videoId, volume }) => {
  const playerRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(script)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`player_${videoId}`, {
        videoId,
        autoplay: 1,
        playerVars: {
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      })
    }
  }, [videoId])

  const onPlayerReady = (event) => {
    event.target.playVideo()
    console.log('Playing', title)
    if (playerRef.current) {
      playerRef.current.setVolume(volume)
    }
  }

  return (
    <div id={`player_${videoId}`} style={{display: 'none'}}></div>
  )
}

export default AudioPlayerWithVolume
