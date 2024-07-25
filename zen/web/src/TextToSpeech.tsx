import React, { useEffect, useState } from 'react'

const TextToSpeech = ({ text, onEnd }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (text && !isSpeaking) {
      setIsSpeaking(true)
      playTextToSpeech(text)
    }
  }, [text, isSpeaking])

  const playTextToSpeech = async (text) => {
    try {
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
      audio.play()

      audio.onended = () => {
        onEnd()
      }

    } catch (error) {
      console.error('Error during text to speech:', error)
    }
  }

  return null
}

export default TextToSpeech
