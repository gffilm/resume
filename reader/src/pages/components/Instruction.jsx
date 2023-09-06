import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export const Instruction = ({ children, number, boxStyle, className, textStyle }) => {
  return (
    <Box sx={boxStyle} className={className}>
      <Paper
        sx={{
          borderRadius: 50,
          padding: 2,
          paddingInlineStart: 4,
          // maxWidth: "80%",
          // margin: "0px auto",
          textAlign: "left",
        }}
      >
        <Typography variant="h2" sx={textStyle}>
          {number && (
            <>
              <strong>{number}:</strong>&nbsp;
            </>
          )}
          {children}
        </Typography>
      </Paper>
    </Box>
  );
};
