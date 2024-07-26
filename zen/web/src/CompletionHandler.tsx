import React, { useState, useEffect } from 'react'

const CompletionHandler = ({ prompt, setResponse }) => {
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    if (prompt) {
      setPrompts([...prompts, prompt])
    }
  }, [prompt])

  useEffect(() => {
    setTimeout(() => {
      setResponse('Welcome to Zen! What would you like to learn about?')
    }, 3500)
  }, [])

  useEffect(() => {
    if (prompts.length) {
      handleCompletion()
    }
  }, [prompts])


  const handleCompletion = async () => {
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
      setResponse(data.response)
    }
  }

  return null
}

export default CompletionHandler
