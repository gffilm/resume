import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Slider } from '@mui/material'
import ImageLoader from './ImageLoader'
import AudioPlayerWithVolume from './AudioPlayerWithVolume'
import TextToSpeech from './TextToSpeech'
import Transcriber from './Transcriber'
import FadeText from './FadeText'

const Zen = () => {
  const [loading, setLoading] = useState(true)
  const [controlsReady, setControlsReady] = useState(false)
  const [playAmbient, setPlayAmbient] = useState(false)
  const [playSoundFX, setPlaySoundFX] = useState(false)
  const [startSpeaking, setStartSpeaking] = useState(false)
  const [startTranscriber, setStartTranscriber] = useState(false)
  const [enableMicrophone, setEnableMicrophone] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeOutText, setFadeOutText] = useState(false)
  const [text, setText] = useState('')
  const [prompts, setPrompts] = useState([])

  const [ambientVolume, setAmbientVolume] = useState(() => {
    return parseInt(localStorage.getItem('ambientVolume')) || 20
  })
  const [soundFXVolume, setSoundFXVolume] = useState(() => {
    return parseInt(localStorage.getItem('soundFXVolume')) || 30
  })
  const [musicVolume, setMusicVolume] = useState(() => {
    return parseInt(localStorage.getItem('musicVolume')) || 40
  })
  const [speechVolume, setSpeechVolume] = useState(() => {
    return parseInt(localStorage.getItem('speechVolume')) || 100
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500)
      setTimeout(() => {
        setText('Welcome to Zen! What would you like to learn about?')
      }, 2500)

      setTimeout(() => setPlayAmbient(true), 2000)
      setTimeout(() => setPlaySoundFX(true), 3000)
      setTimeout(() => setPlayMusic(true), 4000)
      setTimeout(() => setStartSpeaking(true), 13000)
      setTimeout(() => setControlsReady(true), 6000)
      setTimeout(() => setStartTranscriber(true), 1000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (prompts.length) {
      handleCompletion()
    }
  }, [prompts])

  const handleTranscription = (text) => {
    if (!startTranscriber) {
      return
    }
    console.log('Disabling Transcriber')
    setEnableMicrophone(false)
    console.log('Heard', text)
    setFadeOutText(true)
    setTimeout(() => {
      setPrompts([...prompts, text])
    }, 2000)
  }

  const handleAudioEnded = () => {
    console.log('Enabling Transcriber')
    setEnableMicrophone(true)
    setTimeout(() => {
      setFadeOutText(true)
    }, 1000)
  }

  const handleCompletion = async () => {
    setText('')
    console.log('Getting completion response...', prompts)
    const response = await fetch('http://localhost:3001/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts }),
    })
    const data = await response.json()

    if (data && data.response) {
      console.log('Got Response', data.response)
      setText(data.response)
    }
  }

  const handleDoneFading = () => {
    console.log('Done fading')
  }

  const handleSliderChange = (setter, key) => (e, newValue) => {
    setter(newValue)
    localStorage.setItem(key, newValue)
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
        {text && <FadeText fadeOut={fadeOutText} text={text} onComplete={handleDoneFading} />}
        {startTranscriber && <Transcriber enableMicrophone={enableMicrophone} onTranscription={handleTranscription} />}
        {playAmbient && <AudioPlayerWithVolume title="ambient" volume={ambientVolume} videoId="DVHaSmW9QNA" />}
        {playSoundFX && <AudioPlayerWithVolume title="sound fx" volume={soundFXVolume} videoId="X0NgSuFY2bk" />}
        {playMusic && <AudioPlayerWithVolume title="music" volume={musicVolume} videoId="eD2uecOlPvQ" />}
        {text && <TextToSpeech text={text} volume={speechVolume / 100} onEnd={handleAudioEnded} />}

        {!loading && (
          <Box sx={{ minWidth: '20em' }} position="absolute" bottom={20} left={20}>
            <Typography color='#fff'>Speech</Typography>
            <Slider
              value={speechVolume}
              onChange={handleSliderChange(setSpeechVolume, 'speechVolume')}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Typography color='#fff'>Ambient</Typography>
            <Slider
              value={ambientVolume}
              onChange={handleSliderChange(setAmbientVolume, 'ambientVolume')}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Typography color='#fff'>Waves</Typography>
            <Slider
              value={soundFXVolume}
              onChange={handleSliderChange(setSoundFXVolume, 'soundFXVolume')}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Typography color='#fff'>Music</Typography>
            <Slider
              value={musicVolume}
              onChange={handleSliderChange(setMusicVolume, 'musicVolume')}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
        )}
      </Box>
    </section>
  )
}

export default Zen
