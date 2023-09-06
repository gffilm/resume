import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useNavigate } from "react-router-dom";

export const NavBar = (props) => {
  const { header, handleModeToggle, mode, handleAudioToggle, audio, handleMicToggle, mic } = props;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleGoHome}
            >
              <HomeIcon />
            </IconButton>
          </Box>
            {header}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={handleAudioToggle} color="inherit">
              {audio ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={handleMicToggle} color="inherit">
              {mic ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={handleModeToggle} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
    </Box>
  );
};
