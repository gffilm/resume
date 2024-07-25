import React, { useEffect, useState } from 'react'

const TextToSpeechQueue = ({ texts }) => {
  texts.push('')
  const [attempts, setAttempts] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])

  useEffect(() => {
    if (voices.length) {
      return
    }
    // Fetch voices and store them in state
    const fetchVoices = () => {
      const synth = window.speechSynthesis
      const handleVoicesChanged = () => {
        const availableVoices = synth.getVoices()
        if (availableVoices.length > 0) {
          setVoices(availableVoices)
          window.speechSynthesis.onvoiceschanged = null
        }
      }

      if (synth.onvoiceschanged) {
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged
      } else {
        handleVoicesChanged()
      }
    }

    fetchVoices()
    setTimeout(() => {
      setAttempts(attempts + 1)
    }, 1000)
  }, [attempts])

  useEffect(() => {
    if (voices.length > 0 && !isSpeaking && texts.length > 0) {
      setIsSpeaking(true)
      console.log('Playing text')
    }
  }, [voices, isSpeaking, texts.length])

  useEffect(() => {
    if (isSpeaking && texts.length > 0) {
      const speakNext = () => {
        if (currentIndex < texts.length) {
          const text = texts[currentIndex]
          const synth = window.speechSynthesis

          const getFemaleUKVoice = () => {
            const femaleUKVoices = voices.filter(voice => voice.name.toLowerCase().includes('google uk english female'))
            return femaleUKVoices[0] // Return the first female UK voice if found
          }

          const selectedVoice = getFemaleUKVoice() || voices[0]
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.voice = selectedVoice
          utterance.rate = 0.8
          utterance.pitch = 1

          utterance.onend = () => {
            setTimeout(() => {
              setCurrentIndex(prevIndex => prevIndex + 1)
            }, 3000) 

            if (currentIndex >= texts.length - 1) {
              setIsSpeaking(false)
            }
          }

          synth.speak(utterance)
        }
      }

      speakNext()
    }
  }, [isSpeaking, currentIndex, texts, voices])

  return null
}

export default TextToSpeechQueue
