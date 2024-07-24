import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import ImageLoader from './ImageLoader'
import AudioPlayer from './AudioPlayer'
import AudioPlayerWithVolume from './AudioPlayerWithVolume'
import TextToSpeech from './TextToSpeech'
import texts from './data/texts'

const Zen = () => {
  const [loading, setLoading] = useState(true)
  const [playAmbient, setPlayAmbient] = useState(false)
  const [playSoundFX, setPlaySoundFX] = useState(false)
  const [startSpeaking, setStartSpeaking] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500)
      setTimeout(() => setPlayAmbient(true), 2000)
      setTimeout(() => setPlaySoundFX(true), 9000)
      setTimeout(() => setStartSpeaking(true), 13000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="fade-background">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        position="relative"
      >
        {loading && (
          <CircularProgress
            sx={{
              color: '#ddd',
              position: 'absolute',
              opacity: fadeOut ? 0 : 1,
              transition: 'opacity 0.5s'
            }}
          />
        )}
        <ImageLoader src='https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?w=740&t=st=1721791331~exp=1721791931~hmac=fae8f8967cdd4cae30672efe3ad3a3d19697ac5f34de62773e5e75c7d68bf816' />
        {playAmbient && <AudioPlayer title="ambient" videoId='DVHaSmW9QNA' />}
        {playSoundFX && <AudioPlayerWithVolume title="sound fx" volume={50} videoId='X0NgSuFY2bk' />}
        {startSpeaking && <TextToSpeech texts={texts} />}
      </Box>
    </section>
  )
}

export default Zen
