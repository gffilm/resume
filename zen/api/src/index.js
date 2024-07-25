const express = require("express")
const fs = require("fs").promises 
const path = require("path")
const cors = require("cors")
const multer = require("multer")
const { transcribeAudio, textToSpeech, completion } = require("./openai")

const app = express()
const port = 3001
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.post("/transcribe", upload.single('file'), async (req, res) => {
  try {
    // The uploaded file is available in req.file
    if (!req.file) {
      return res.status(400).send({ error: "No file provided" })
    }

    // Call the transcribeAudio function from openai.js
    const transcription = await transcribeAudio(req.file.buffer)

    res.send({ transcription })
  } catch (error) {
    console.error('Error handling transcription request:', error)
    res.status(500).send({ error: "Transcription failed" })
  }
})

app.post("/completion", async (req, res) => {
  const { prompts } = req.body
  try {
    const response = await completion(prompts)
    res.send({ response })
  } catch (error) {
    console.error('Error handling completion request:', error)
    res.status(500).send({ error: "Completion failed" })
  }
})

app.post("/tts", async (req, res) => {
  const { text } = req.body
  try {
    const audioBuffer = await textToSpeech(text);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audioBuffer)
  } catch (error) {
    console.error('Error handling TTS request:', error)
    res.status(500).send({ error: "TTS failed" })
  }
})

app.get("*", (req, res) => {
  res.send({
    status: true
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
