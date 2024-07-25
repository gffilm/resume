import React, { useState, useEffect, useRef } from 'react'

const Transcriber = ({ onTranscription, enableMicrophone }) => {
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const scriptProcessorRef = useRef(null)
  const silenceTimerRef = useRef(null)
  const hasDetectedNoiseRef = useRef(false)
  const voiceDetectedRef = useRef(false)

  const silenceThreshold = -30 // Decibel threshold for detecting silence
  const silenceTimeout = 1500 // Time in milliseconds to consider as a pause

  useEffect(() => {
    if (!enableMicrophone) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect()
        scriptProcessorRef.current = null
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current)
        silenceTimerRef.current = null
      }
      return
    }

    const getAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const newMediaRecorder = new MediaRecorder(stream)

      console.log('Microphone Listening')

      newMediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      newMediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0 && voiceDetectedRef.current) {
          enableMicrophone = false
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          sendAudioForTranscription(audioBlob)
          audioChunksRef.current = []
          hasDetectedNoiseRef.current = false // Reset noise detection
          voiceDetectedRef.current = false // Reset voice detection
        } else {
          audioChunksRef.current = []
        }
      }

      mediaRecorderRef.current = newMediaRecorder
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
          if (!silenceTimerRef.current && hasDetectedNoiseRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              newMediaRecorder.stop()
              silenceTimerRef.current = null
            }, silenceTimeout)
          }
        } else {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current)
            silenceTimerRef.current = null
          }
          if (!hasDetectedNoiseRef.current) {
            hasDetectedNoiseRef.current = true
            newMediaRecorder.start() // Start recording when noise is detected
          }
          // Check if the noise lasts long enough to be considered as voice
          if (rms > 0.001) { // Adjust this threshold as needed for sensitivity
            voiceDetectedRef.current = true
          }
        }
      }

      source.connect(processor)
      processor.connect(context.destination)
      audioContextRef.current = context
      scriptProcessorRef.current = processor
    }

    getAudio()

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect()
        scriptProcessorRef.current = null
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current)
        silenceTimerRef.current = null
      }
    }
  }, [enableMicrophone]) // Run the effect when enableMicrophone changes

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
