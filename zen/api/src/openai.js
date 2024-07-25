// openai.js
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

module.exports = {
  transcribeAudio,
}
