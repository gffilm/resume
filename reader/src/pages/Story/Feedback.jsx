import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  DialogTitle,
  DialogContent,
  Stack,
  Divider,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Feedback = ({ feedback, title, feedbackconvoCounter }) => {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {feedback.map((trait, index) => {
            const color =
              trait.score > 7 ? "green" : trait.score < 4 ? "red" : "orange";
            return (
              <div key={index}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography gutterBottom variant="h5" component="div">
                    {trait.userGoal}
                  </Typography>
                  {trait.loading ? (
                    <div style={{ textAlign: "center", margin: "1em", paddingRight: "1em" }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <Typography variant="h5" color={color} component="span">
                      {trait.score}/10
                    </Typography>
                  )}
                </Stack>
                <Typography variant="body1">{trait.feedback}</Typography>
              </div>
            );
          })}
        </Stack>
      </DialogContent>
    </>
  );
};
