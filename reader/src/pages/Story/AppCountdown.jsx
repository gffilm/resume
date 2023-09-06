import React, { useState, useEffect, useRef } from "react";

import { Alert, Stack } from "@mui/material";
import Countdown from "react-countdown";

export const AppCountDown = (props) => {
  const { countdown, onComplete, disabled, label } = props;

  const countdownRef = useRef();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // When disabled prop is true, pause the countdown
    if (disabled) {
      setPaused(true);
      countdownRef.current.pause();
    } else {
      countdownRef.current.start();
      setPaused(false);
    }
  }, [disabled]);

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <Alert severity="error" margin="inherit">
          You're out of time
        </Alert>
      );
    } else {
      // Render a countdown
      return (
        <>
            <span>
              {minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}:
              {seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </span>
        </>
      );
    }
  };


  return (
    <>
      <Stack sx={{opacity: paused ? 0.3 : 1, textAlign:"center"}}>
        <p style={{margin: 0}}>{label}</p>
        <Countdown
          ref={countdownRef}
          date={countdown}
          renderer={countdownRenderer}
          onComplete={onComplete}
        />
      </Stack>
    </>
  );
};
