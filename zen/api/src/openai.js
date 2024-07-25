const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require('dotenv').config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

async function transcribeAudio(audioBuffer) {
  const formData = new FormData()
  formData.append('file', audioBuffer, 'audio.wav')
  formData.append('model', 'whisper-1') 

  try {
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error during transcription:', error)
    throw error
  }
}

async function textToSpeech(text) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      {
        model: 'tts-1',
        input: text,
        voice: 'alloy'
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer'
      }
    )

    return response.data
  } catch (error) {
    console.error('Error during tts:', error)
    throw error
  }
}

async function completion(prompts) {
  const messages = []
  let system = 'Respond in 1-2 sentences'
  
  if (prompts.length === 1) {
    system = 'Welcome the user to Zen. ' + system
  }
  
  messages.push({ role: 'system', content: system})

  prompts.forEach((prompt) => {
    messages.push({role: 'user', content: prompt})
  })

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 100, // Adjust max tokens as needed
        temperature: 0.7 // Adjust temperature as needed
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error during completion:', error)
    throw error
  }
}

module.exports = {
  completion,
}

module.exports = {
  transcribeAudio,
  textToSpeech,
  completion
}
