// openai.js
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

async function completion(text) {
  const prompt = `Respond in 1-2 sentences: ${text}`
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
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
  completion
}
