import React, { useState, useEffect, useRef } from 'react'

const Transcriber = ({ onTranscription }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const audioChunksRef = useRef([])
  const [audioContext, setAudioContext] = useState(null)
  const [scriptProcessor, setScriptProcessor] = useState(null)
  const silenceThreshold = -50 // Decibel threshold for detecting silence
  const silenceTimeout = 1500 // Time in milliseconds to consider as a pause
  let silenceTimer = null
  let hasDetectedNoise = false // Track if noise has been detected
  let voiceDetected = false // Track if voice has been detected

  useEffect(() => {
    const getAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const newMediaRecorder = new MediaRecorder(stream)

      console.log('Microphone Listening')

      newMediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      newMediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0 && voiceDetected) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          sendAudioForTranscription(audioBlob)
          audioChunksRef.current = []
          hasDetectedNoise = false // Reset noise detection
          voiceDetected = false // Reset voice detection
        } else {
          audioChunksRef.current = []
        }
      }

      setMediaRecorder(newMediaRecorder)
      setupAudioContext(stream, newMediaRecorder)
    }

    const setupAudioContext = (stream, newMediaRecorder) => {
      const context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const processor = context.createScriptProcessor(2048, 1, 1)

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0)
        const sum = inputData.reduce((acc, val) => acc + val * val, 0)
        const rms = Math.sqrt(sum / inputData.length)
        const decibels = 20 * Math.log10(rms)
        if (decibels < silenceThreshold) {
          if (!silenceTimer && hasDetectedNoise) {
            silenceTimer = setTimeout(() => {
              newMediaRecorder.stop()
              silenceTimer = null
            }, silenceTimeout)
          }
        } else {
          if (silenceTimer) {
            clearTimeout(silenceTimer)
            silenceTimer = null
          }
          if (!hasDetectedNoise) {
            hasDetectedNoise = true
            newMediaRecorder.start() // Start recording when noise is detected
          }
          // Check if the noise lasts long enough to be considered as voice
          if (rms > 0.001) { // Adjust this threshold as needed for sensitivity
            voiceDetected = true
          }
        }
      }

      source.connect(processor)
      processor.connect(context.destination)
      setAudioContext(context)
      setScriptProcessor(processor)
    }

    getAudio()
  }, [])

  const sendAudioForTranscription = async (audioBlob) => {
    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.wav')

    try {
      console.log('Sending audio...')
      const response = await fetch('http://localhost:3001/transcribe', {
         method: 'POST',
         body: formData,
      })

      const data = await response.json()
      if (data && data.transcription) {
        onTranscription(data.transcription.text)
      }
      console.log('Transcription Response:', data.transcription.text)
    } catch (error) {
      console.error('Error transcribing audio:', error)
    }
  }

  return null
}

export default Transcriber
