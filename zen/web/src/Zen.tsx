import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ImageLoader from './ImageLoader'
import Transcriber from './Transcriber'
import FadeText from './FadeText'
import Loader from './Loader'
import AudioPlayers from './AudioPlayers'
import CompletionHandler from './CompletionHandler'

const Zen = () => {
  const [loading, setLoading] = useState(true)
  const [enableMicrophone, setEnableMicrophone] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [text, setText] = useState('')
  const [prompts, setPrompts] = useState([])
  setTimeout(() => setLoading(false), 2500)

  const handleSpeechEnded = () => {
    setEnableMicrophone(true)
  }

  const handleTranscription = (response) => {
    setTranscription(response)
  }

  const handleResponse = (response) => {
    setText(response)
  }

  return (
    <section className="fade-background">
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" position="relative">
        {loading && <Loader />}
        {!loading && <ImageLoader src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?w=740&t=st=1721791331~exp=1721791931~hmac=fae8f8967cdd4cae30672efe3ad3a3d19697ac5f34de62773e5e75c7d68bf816" />}
        <Transcriber onTranscription={handleTranscription} enableMicrophone={enableMicrophone} />
        {text && <FadeText text={text} />}
        <AudioPlayers text={text} speechEnded={handleSpeechEnded} />
        <CompletionHandler prompt={transcription} setResponse={handleResponse} />
      </Box>
    </section>
  )
}

export default Zen
