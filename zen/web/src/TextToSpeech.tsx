// TextToSpeech.js
import React, { useEffect } from 'react'

const TextToSpeech = ({ text }) => {
  useEffect(() => {
    const speak = () => {
      const synth = window.speechSynthesis
      const voices = synth.getVoices()

      if (voices.length > 0) {
        const getRandomVoice = () => {
          const calmingVoices = voices.filter(voice => voice.name.toLowerCase().includes('google uk english female'))
          if (calmingVoices.length > 0) {
            const randomVoice = calmingVoices[Math.floor(Math.random() * calmingVoices.length)]
            return randomVoice
          }
        }

        const selectedVoice = getRandomVoice() || voices[0] // Fallback to the first voice if none are found

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = selectedVoice
        utterance.rate = 0.8
        utterance.pitch = 1
        synth.speak(utterance)
      }
    }

    // Ensure voices are loaded before speaking
    const onVoicesLoaded = () => {
      setTimeout(() => {
        speak()
      })
    }

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = onVoicesLoaded
    } else {
      setTimeout(() => {
        speak()
      })
    }
  }, [text])

  return null
}

export default TextToSpeech
