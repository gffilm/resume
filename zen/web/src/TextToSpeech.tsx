import React, { useEffect, useRef, useState } from 'react'

const TextToSpeech = ({ text, onEnd, volume }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    if (text !== currentText && !isSpeaking) {
      setCurrentText(text)
      playTextToSpeech(text)
    }
  }, [text, currentText, isSpeaking])

  const playTextToSpeech = async (text) => {
    try {
      setIsSpeaking(true)
      const response = await fetch('http://localhost:3001/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const audioBuffer = await response.arrayBuffer()
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.volume = volume
      audioRef.current = audio
      audio.play()

      audio.onended = () => {
        onEnd()
        setIsSpeaking(false)
      }

    } catch (error) {
      console.error('Error during text to speech:', error)
      setIsSpeaking(false) // Reset isSpeaking in case of an error
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return null
}

export default TextToSpeech
