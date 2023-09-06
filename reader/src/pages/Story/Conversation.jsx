import React, { useEffect, useRef } from "react";
import {
  Typography,
  CardContent,
  CardHeader,
  Card,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

export const Conversation = ({ conversation, counter }) => {
  const containerRef = useRef(null);

  // Scroll to the bottom of the chat room whenever new messages are added
  useEffect(() => {
    scroll();
  }, [counter]);

  const scroll = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return (
    <Stack
      ref={containerRef}
      sx={{
        height: "calc(100vh - 225px)",
        overflowY: "scroll",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        alignSelf: "flex-end",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center top",
      }}
      spacing={2}
    >
      {!conversation.length && (<Box>
        <Typography>Highlight any text and click the button to read the section</Typography>
      </Box>)}
      {conversation.map((message, i) => (
        <Box
          key={i}
          sx={{
            display: "inline-flex",
            minWidth: 60,
            maxWidth: 800,
            flexDirection: message.sender ? "row-reverse" : "row",
          }}
        >
          <Card
            sx={{
              backgroundColor: message.error ? "#ff0000" : (!message.recipient ? "#2979FF" : "#E0E0E0"),
              color: !message.recipient ? "#FFFFFF" : "#000000",
              borderRadius: message.recipient
                ? "20px 20px 20px 0"
                : "20px 20px 0 20px",
              maxWidth: 380,
            }}
          >
            <CardContent>
              <Typography>{message.reply}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Stack>
  );
};
