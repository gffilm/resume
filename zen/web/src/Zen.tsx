import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import ImageLoader from './ImageLoader'
import AudioPlayer from './AudioPlayer'
import AudioPlayerWithVolume from './AudioPlayerWithVolume'
import TextToSpeech from './TextToSpeech'
import Transcriber from './Transcriber'
import FadeText from './FadeText'

const Zen = () => {
  const [loading, setLoading] = useState(true)
  const [playAmbient, setPlayAmbient] = useState(false)
  const [playSoundFX, setPlaySoundFX] = useState(false)
  const [startSpeaking, setStartSpeaking] = useState(false)
  const [startTranscriber, setStartTranscriber] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [textToSpeak, setTextToSpeak] = useState('')
  const [transcriptionText, setTranscriptionText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500)
      setTimeout(() => setPlayAmbient(true), 2000)
      setTimeout(() => setPlaySoundFX(true), 9000)
      setTimeout(() => setStartSpeaking(true), 13000)
      setTimeout(() => setPlayMusic(true), 20000)
      setTimeout(() => {
        handleTranscription('This is a sample transcription text')
      }, 3000)
      return
      setTimeout(() => setStartTranscriber(true), 2000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleTranscription = (text) => {
    setTranscriptionText(text)
    getResponse(text);
  }

  const getResponse = async (text) => {
    console.log('Get response', text)
    const response = await fetch('http://localhost:3001/completion', {
         method: 'POST',
         body: text
      })
  }

  const handleDoneFading = () => {
    setTranscriptionText('')
    setTimeout(() => {
      handleTranscription('You go girl')
    })
  }

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
              transition: 'opacity 0.5s',
            }}
          />
        )}

        {!loading && <ImageLoader src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?w=740&t=st=1721791331~exp=1721791931~hmac=fae8f8967cdd4cae30672efe3ad3a3d19697ac5f34de62773e5e75c7d68bf816" />}
        {transcriptionText && <FadeText text={transcriptionText} onComplete={handleDoneFading} />}
        {startTranscriber && <Transcriber onTranscription={handleTranscription} />}
        {playAmbient && <AudioPlayer title="ambient" videoId="DVHaSmW9QNA" />}
        {playSoundFX && <AudioPlayerWithVolume title="sound fx" volume={20} videoId="X0NgSuFY2bk" />}
        {playMusic && <AudioPlayer title="music" videoId="eD2uecOlPvQ" />}
        {textToSpeak && <TextToSpeech text={textToSpeak} />}
      </Box>
    </section>
  )
}

export default Zen
