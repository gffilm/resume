import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import arithmatic from "./Problems/arithmatic.json";
import ding from "../../assets/audio/message.mp3";
import { Words } from "../components";
import {
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Arithmatic = (props) => {
  const { setHeader, updatedSettings } = props;
  const navigate = useNavigate();
  const [problems, setProblems] = useState(arithmatic);
  const [correct, setCorrect] = useState(false);

  const correctPhrases = [
    'Well done!',
    'Great job!',
    'You got it!',
  ];

  const incorrectPhrases = [
    'Oops! Try again.',
    'Not quite. Give it another shot.',
    'Incorrect answer. Try a different one.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [speechService, setSpeechService] = useState(null);
  const [reading, setReading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

useEffect(() => {
  let service = new SpeechSynthesisUtterance();
  let voices = [];

  const loadVoices = () => {
    voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      setTimeout(loadVoices, 100);
    } else {
      service.voice = voices[6];
      service.text = '';
      setSpeechService(service);
    }
  };

  loadVoices();
  service.addEventListener('end', () => {
    setReading(false);
  });
}, []);

  const nextLine = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer(''); // Clear user's answer when moving to the next problem
      setFeedback(''); // Clear feedback when moving to the next problem
      setCorrect(false)
    }
  };

  const previousLine = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer(''); // Clear user's answer when moving to the previous problem
      setFeedback(''); // Clear feedback when moving to the previous problem
    }
  };

  const readWord = (word) => {
    speechService.text = word.trim();
    window.speechSynthesis.speak(speechService);
  };

  const readAll = () => {
    setReading(true);
    readWord(problems[currentIndex].problem);
  }

  const solve = () => {
    const correctAnswer = problems[currentIndex].answer;
    if (!userAnswer) {
      setUserAnswer(correctAnswer)
      readWord(`The correct answer is ${correctAnswer}`)
      return
    }
    if (userAnswer === correctAnswer) {
      const randomCorrectPhrase =
        correctPhrases[Math.floor(Math.random() * correctPhrases.length)];
      setFeedback(randomCorrectPhrase);
      readWord(randomCorrectPhrase);
      setCorrect(true)
    } else {
      const randomIncorrectPhrase =
        incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)];
      setFeedback(randomIncorrectPhrase);
      readWord(randomIncorrectPhrase); // Read the incorrect phrase aloud
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 0 }}>
        <Grid xs={12} md={12}>
          <Card>
            <CardContent>
              <CardContent>
                {/* Make the problem and answer bigger and centered */}
                <Typography variant="h1" align="center" sx={{ marginBottom: 2, fontSize: '3rem' }}>
                  <Words text={problems[currentIndex].problem} onWordClick={readWord} />
                </Typography>
              </CardContent>
              <Stack
                direction="column" // Change direction to column
                justifyContent="center" // Center the input field and buttons
                alignItems="center"
                spacing={2}
                sx={{ marginTop: 2, minHeight: '10rem' }}
              >
                <TextField
                  label="Your Answer"
                  variant="outlined"
                  size="large"
                  name="input"
                  fullWidth
                  value={userAnswer}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      solve();
                    }
                  }}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  inputProps={{style: {textAlign: 'center', fontSize: 40}}}
                  style={{
                    width: '60%'
                  }}
                />
                
                <Button
                  style={{ margin: '1rem' }}
                  disabled={correct || !userAnswer}
                  variant="contained"
                  onClick={() => {
                    solve();
                  }}
                >
                  SUBMIT
                </Button>
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
                    readAll();
                  }}
                >
                  Read
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

              {feedback && (
                <Typography variant="h4" align="center" color={feedback.includes('Correct') ? 'success' : 'error'}>
                  {feedback}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
