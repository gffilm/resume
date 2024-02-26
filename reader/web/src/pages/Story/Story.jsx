import React, { useState, useEffect, useReducer } from "react"
import TextField from "@mui/material/TextField"
import scenarioService from "../../services/scenario.service"
import { useNavigate } from "react-router-dom"
import ding from "../../assets/audio/message.mp3"

import settings from "../../services/settings.service"
import backendService from "../../services/backend.service"
import requestService from "../../services/request.service"
import {
  AppModal,
  AppButton,
  ModalService,
  AudioPlayer,
  Sliders,
  AudioRecord,
  Words
} from "../components"

import { timeFromNow } from "../../utilities"
import CircularProgress from "@mui/material/CircularProgress"
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"


const HelpedWordsModal = ({ helpedWords, onClose }) => {
  return (
    <div>
      <DialogContent>
        <Typography variant="h4">Words You Needed Help With:</Typography>
        <ul>
          {helpedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </div>
  );
};


export const Story = (props) => {
  const { setHeader, updatedSettings } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (!scenarioService.isInitialized()) {
      navigate("/")
    } else {
      props.setHeader(scenario.title)
      if (!state.initialized) {
        dispatch(startAction)
        dispatch({
          type: "INITALIZED",
          payload: {
            initialized: true,
            story: scenario.story
          }
        })
      }
    }

    if (updatedSettings) {
        dispatch({
          type: "SETTINGS UPDATE",
          payload: {
            audioURL: null,
            useVoiceToText: settings.useVoiceToText,
            useTextToVoice: settings.useTextToVoice
          }
        })
      }
  }, [setHeader, updatedSettings, navigate])

  let scenario = scenarioService.getSituation()

  const initialState = {
    initialized: false,
    useVoiceToText: settings.useVoiceToText,
    text: '',
    name: 'Kayla',
    currentLine: '',
    currentIndex: 0,
    story: []
  }


  const startAction = {
    type: "INITALIZED",
    payload: initialState,
  }

  function reducer(state, action) {
    return { ...state, ...action.payload}
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [speechService, setSpeechService] = useState(null)
  const [reading, setReading] = useState(false)
  const [helpedWords, setHelpedWords] = useState([])
  const [showHelpedWordsModal, setShowHelpedWordsModal] = useState(false)


  const nextLine = () => {
    if (currentIndex < state.story.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previousLine = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const readWord = (word) => {
    if (!state.useTextToVoice) {
      return
    }
    speechService.text = word.trim()
    window.speechSynthesis.speak(speechService)
    if (!helpedWords.includes(word)) {
      setHelpedWords((prevWords) => [...prevWords, word])
    }
  }

  const recordAudio = (blob) => {
    dispatch({type: 'SEND_MESSAGE', payload: {
      text: '',
    }})

    backendService.sendAudio(blob, {}).then((result) => {
    })
  }

  const readAll = () => {
    if (!state.useTextToVoice) {
      return
    }
    speechService.text = state.story[currentIndex]
    window.speechSynthesis.speak(speechService)
    setReading(true)
  }

  const showHelpedWords = () => {
    setShowHelpedWordsModal(true)

  }

 useEffect(() => {
  let service = new SpeechSynthesisUtterance()
  let voices = []

  const loadVoices = () => {
    voices = speechSynthesis.getVoices()
    if (voices.length === 0) {
      setTimeout(loadVoices, 100)
    } else {
      service.voice = voices[6]
      service.text = ''
      setSpeechService(service)
    }
  }

  loadVoices()

  service.addEventListener('end', () => {
    setReading(false)
  })
}, [])

  if (!state.initialized) {
    return (
      <></>
    )
  }

 return (
  <>
    {showHelpedWordsModal && (
      <HelpedWordsModal
        helpedWords={helpedWords}
        onClose={() => setShowHelpedWordsModal(false)}
      />
    )}

    <Grid container spacing={2} sx={{ padding: 0 }}>
      <Grid xs={12} md={12}>
        <Card>
          <CardContent>
            <CardHeader>{scenario.title}</CardHeader>
            <CardContent>
              <Typography variant="h2">
                <Words
                  text={state.story[currentIndex]}
                  onWordClick={readWord}
                />
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 2, minHeight: '4rem' }}
            >
              {state.audioURL && state.useTextToVoice && (
                <AudioPlayer file={state.audioURL} onComplete={() => {}} />
              )}
              {state.canType && state.useVoiceToText && (
                <AudioRecord
                  onComplete={(blob) => {
                    recordAudio(blob)
                  }}
                />
              )}
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'auto', // Pushes the button to the bottom
              }}
            >
              <Button
                style={{ margin: '1rem' }}
                variant="contained"
                onClick={previousLine}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>

              <Button
                style={{ margin: '1rem' }}
                disabled={reading || !state.useTextToVoice}
                variant="contained"
                onClick={() => {
                  readAll()
                }}
              >
                Read
              </Button>

              <Button
                style={{ margin: '1rem' }}
                variant="contained"
                onClick={nextLine}
                disabled={currentIndex === state.story.length - 1}
              >
                Next
              </Button>
              <Button
                style={{ margin: '1rem' }}
                variant="contained"
                onClick={showHelpedWords}
                disabled={currentIndex !== state.story.length - 1}
              >
                Show Missed Words
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
)
}