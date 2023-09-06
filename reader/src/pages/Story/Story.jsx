import React, { useState, useEffect, useReducer } from "react";
import TextField from "@mui/material/TextField";
import scenarioService from "../../services/scenario.service";
import { useNavigate } from "react-router-dom";
import ding from "../../assets/audio/message.mp3";

import settings from "../../services/settings.service";
import backendService from "../../services/backend.service";
import exportService from "../../services/export.service";
import requestService from "../../services/request.service";
import {
  AppModal,
  AppButton,
  ModalService,
  AudioPlayer,
  Sliders,
  AudioRecord,
  HTMLMarkdown,
  Words
} from "../components";

import { timeFromNow } from "../../utilities";
import CircularProgress from "@mui/material/CircularProgress";
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
} from "@mui/material";
import { Conversation } from "./Conversation";
import { AppCountDown } from "./AppCountdown";
import { ModalContents } from "./ModalContents";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Story = (props) => {
  const { setHeader, updatedSettings } = props;
  const navigate = useNavigate();


  useEffect(() => {
    let service = new SpeechSynthesisUtterance(),
    voices = speechSynthesis.getVoices();
    service.voice = voices[6];
    service.text = '';
    setSpeechService(service);
  }, [])

  useEffect(() => {
    if (!scenarioService.isInitialized()) {
      navigate("/");
    } else {
      props.setHeader(scenario.title);
      if (!state.initialized) {
        dispatch(startAction);
        dispatch({
          type: "INITALIZED",
          payload: {
            initialized: true,
            story: scenario.story
          }
        });
      }
    }

    if (updatedSettings) {
        dispatch({
          type: "SETTINGS UPDATE",
          payload: {
            audioURL: null,
            useVoiceToText: settings.useVoiceToText,
            useTextToVoice: settings.useTextToVoice,
          }
        });
      }
  }, [setHeader, updatedSettings, navigate]);

  let scenario = scenarioService.getSituation();

  const initialState = {
    initialized: false,
    useVoiceToText: settings.useVoiceToText,
    showGetFeedbackButtonInModal: false,
    startedConversation: false,
    convoCounter: 0,
    feedbackconvoCounter: 0,
    text: '',
    conversation: [],
    feedback: [],
    isModalOpen: false,
    showScenario: false,
    isOutOfTime: false,
    gettingFeedback: false,
    canType: true,
    gotAllFeedback: false,
    feedbackTitle: '',
    audioURL: null,
    closeModalText: 'Try Again',
    showExportButton: settings.allowXLSXExport,
    name: 'Kayla',
    currentLine: '',
    currentIndex: 0,
    story: []
  };


  const startAction = {
    type: "INITALIZED",
    payload: initialState,
  };

  function reducer(state, action) {
    return { ...state, ...action.payload};
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [speechService, setSpeechService] = useState(null);

  const nextLine = () => {
    if (currentIndex < state.story.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousLine = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const readWord = (word) => {
    speechService.text = word.trim();
    window.speechSynthesis.speak(speechService);
  };

  const recordAudio = (blob) => {
    dispatch({type: 'SEND_MESSAGE', payload: {
      text: '',
    }});

    backendService.sendAudio(blob, {}).then((result) => {
    });
  };

  const readAll = () => {
    speechService.text = state.story[currentIndex];
    window.speechSynthesis.speak(speechService);
  };

  if (!state.initialized) {
    return (
      <></>
    )
  }

 return (
  <>
    <Grid container spacing={2} sx={{ padding: 0 }}>
      <Grid xs={12} md={12}>
        <Card>
          <CardContent>
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
              sx={{ marginTop: 2, minHeight: '10rem' }}
            >
              {state.audioURL && state.useTextToVoice && (
                <AudioPlayer file={state.audioURL} onComplete={() => {}} />
              )}
              {state.canType && state.useVoiceToText && (
                <AudioRecord
                  onComplete={(blob) => {
                    recordAudio(blob);
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
                variant="contained"
                onClick={() => {
                  readAll();
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

            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);
}