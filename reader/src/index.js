import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, Typography, useMediaQuery } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { MemoryRouter } from 'react-router'

import { 
  Selector, 
  Scenarios, 
  Story,
  MathCards, 
  Addition 
} from "./pages";
import { ErrorBoundary } from "./pages/components/ErrorBoundary";
import { NavBar } from "./pages/components";
import settings from "./services/settings.service";

function App() {

  const [header, setHeader] = useState("Welcome");
  const [error, setError] = useState(null);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
  const [audio, setAudio] = React.useState(settings.useTextToVoice);
  const [mic, setMic] = React.useState(settings.useVoiceToText);
  const [updated, updatedSettings] = React.useState(0);

  useEffect(() => {
    settings.useVoiceToText = mic;
    settings.useTextToVoice = audio;
    updatedSettings(updated + 1);
  }, [audio, mic]);


  const toggles = React.useMemo(
    (memo) => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      toggleAudioMode: () => {
        setAudio((audioMode) => (audioMode = !audioMode));
      },
      toggleMicMode: () => {
        setMic((micMode) => (micMode = !micMode));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#5555ff",
            secondary: "#ffeeee",
          },
          background: {
            default: mode === "light" ? "#efefef" : "#101010",
          },
        },
        typography: {
          allVariants: {
            fontFamily: "sans-serif",
          },
          h1: {
            fontSize: "2rem",
          },
          h2: {
            fontSize: "1.5rem",
          },
          h3: {
            fontSize: "1.3rem",
          },
          h4: {
            fontSize: "1.2rem",
          },
          h5: {
            fontSize: "1.1rem",
          },
        },
       components: {
          MuiButton: {
            defaultProps: {
              variant: 'contained',
              color: 'primary',
              fullWidth: false,
              disabled: false,
              style: {},
              sx: { backgroundColor: "#5555ff", width: '200px' },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <NavBar
            header={header}
            handleModeToggle={toggles.toggleColorMode}
            mode={mode}
            handleAudioToggle={toggles.toggleAudioMode}
            audio={audio}
            handleMicToggle={toggles.toggleMicMode}
            mic={mic}
          />
          <Container>
            <Routes>
              <React.Fragment>
                <Route
                  exact
                  path="/reading"
                  element={<Scenarios setHeader={setHeader} />}
                />
                <Route
                  exact
                  path="/math"
                  element={<MathCards setHeader={setHeader} />}
                />
                <Route
                  exact
                  path="/addition/*"
                  element={<Addition setHeader={setHeader} updatedSettings={updated} />}
                />
                <Route
                  exact
                  path="/story/*"
                  element={<Story setHeader={setHeader} updatedSettings={updated} />}
                />
                <Route
                  exact
                  path="*"
                  element={<Selector setHeader={setHeader} />}
                />
              </React.Fragment>
            </Routes>
          </Container>
        </MemoryRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
