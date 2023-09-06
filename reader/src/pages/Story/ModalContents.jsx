import React from "react";
import { DialogTitle, DialogContent, Typography, Card } from "@mui/material";
import { Feedback } from "./Feedback";
import {
  HTMLMarkdown
} from "../components";


export const  ModalContents = ({ showScenario, scenario, feedback, feedbackTitle, isOutOfTime }) => {
  if (showScenario) {
    return (
      <>
        <DialogTitle>{scenario.longTitle}</DialogTitle>
        <DialogContent>
          <HTMLMarkdown children={scenario.situation} />

          <Typography variant="h3" gutterBottom={true}>
            Instructions:
          </Typography>
          <Typography>
            {scenario.instructions.userStartInstructions}
          </Typography>
        </DialogContent>
      </>
    );
  }

  if (feedback.length > 0) {
    return <Feedback title={feedbackTitle} feedback={feedback} />;
  }

  if (isOutOfTime && !feedback.length) {
    return (
      <>
        <DialogTitle>You're out of time</DialogTitle>
        <DialogContent>
          In a real conversation you won't have very long to respond to your
          colleagues. You can request feedback on the conversation so far or
          try again.
        </DialogContent>
      </>
    );
  }

  return "";
};

