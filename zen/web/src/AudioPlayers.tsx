import React, { useEffect, useState } from 'react'
import AudioPlayerWithVolume from './AudioPlayerWithVolume'
import TextToSpeech from './TextToSpeech'
import VolumeControls from './VolumeControls'

const AudioPlayers = ({ text, speechEnded }) => {

  const [playAmbient, setPlayAmbient] = useState(false)
  const [playSoundFX, setPlaySoundFX] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [ambientVolume, setAmbientVolume] = useState(0)
  const [soundFXVolume, setSoundFXVolume] = useState(0)
  const [musicVolume, setMusicVolume] = useState(0)
  const [speechVolume, setSpeechVolume] = useState(0)

  setTimeout(() => setShowControls(true), 2000)
  setTimeout(() => setPlayMusic(true), 2000)
  setTimeout(() => setPlayAmbient(true), 3000)
  setTimeout(() => setPlaySoundFX(true), 4000)

  useEffect(() => {
    if (showControls) {
      setAmbientVolume(parseInt(localStorage.getItem('ambientVolume')) || 20)
      setSoundFXVolume(parseInt(localStorage.getItem('soundFXVolume')) || 20)
      setMusicVolume(parseInt(localStorage.getItem('musicVolume')) || 20)
      setSpeechVolume(parseInt(localStorage.getItem('speechVolume')) || 1)
    }
  }, [showControls])


  const handleVolumeChange = (volumeType, value) => {
    switch(volumeType) {
      case 'ambient':
        setAmbientVolume(value)
        localStorage.setItem('ambientVolume', value)
        break
      case 'soundFX':
        setSoundFXVolume(value)
        localStorage.setItem('soundFXVolume', value)
        break
      case 'music':
        setMusicVolume(value)
        localStorage.setItem('musicVolume', value)
        break
      case 'speech':
        setSpeechVolume(value)
        localStorage.setItem('speechVolume', value)
        break
      default:
        break
    }
  }

  return (
    <>
      {playAmbient && <AudioPlayerWithVolume title="ambient" volume={ambientVolume} videoId="DVHaSmW9QNA" />}
      {playSoundFX && <AudioPlayerWithVolume title="sound fx" volume={soundFXVolume} videoId="X0NgSuFY2bk" />}
      {playMusic && <AudioPlayerWithVolume title="music" volume={musicVolume} videoId="eD2uecOlPvQ" />}
      {text && <TextToSpeech text={text} volume={speechVolume / 100} onEnd={speechEnded} />}
      {showControls && <VolumeControls 
        ambientVolume={ambientVolume} 
        soundFXVolume={soundFXVolume} 
        musicVolume={musicVolume} 
        speechVolume={speechVolume} 
        onVolumeChange={handleVolumeChange} 
      />}
    </>
  )
}

export default AudioPlayers
