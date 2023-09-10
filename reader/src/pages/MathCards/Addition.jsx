import React, { useState, useEffect, useReducer } from "react";
import TextField from "@mui/material/TextField";
import scenarioService from "../../services/scenario.service";
import { useNavigate } from "react-router-dom";
import ding from "../../assets/audio/message.mp3";

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
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Addition = (props) => {
  const { setHeader, updatedSettings } = props;
  const navigate = useNavigate();
  const problems = [
    {
      problem: '2 + 2',
      answer: '4'
    }
  ]

  useEffect(() => {
    let service = new SpeechSynthesisUtterance(),
    voices = speechSynthesis.getVoices();
    service.voice = voices[6];
    service.text = '';
    setSpeechService(service);
     // Add an event listener to handle the end of speech
    service.addEventListener('end', () => {
      // Set the reading flag back to false when speech ends
      setReading(false);
    });
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0);
  const [speechService, setSpeechService] = useState(null);
  const [reading, setReading] = useState(false);

  const nextLine = () => {
    if (currentIndex < problems.length - 1) {
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

  const solve = () => {
    
  };

 return (
  <>
    <Grid container spacing={2} sx={{ padding: 0 }}>
      <Grid xs={12} md={12}>
        <Card>
          <CardContent>
            <CardContent>
              <Typography variant="h2">
                <Words
                  text={problems[currentIndex].problem}
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
                disabled={reading}
                variant="contained"
                onClick={() => {
                  solve();
                }}
              >
                Solve
              </Button>

              <Button
                style={{ margin: '1rem' }}
                variant="contained"
                onClick={nextLine}
                disabled={currentIndex === problems.length - 1}
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