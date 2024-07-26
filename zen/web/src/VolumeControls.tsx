import React from 'react'
import { Box, Typography, Slider } from '@mui/material'

const VolumeControls = ({ ambientVolume, soundFXVolume, musicVolume, speechVolume, onVolumeChange }) => {

  const handleSliderChange = (volumeType) => (e, newValue) => {
    onVolumeChange(volumeType, newValue)
  }

  return (
    <Box sx={{ minWidth: '20em' }} position="absolute" bottom={20} left={20}>
      <Typography color='#fff'>Speech</Typography>
      <Slider
        value={speechVolume}
        onChange={handleSliderChange('speech')}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
      <Typography color='#fff'>Ambient</Typography>
      <Slider
        value={ambientVolume}
        onChange={handleSliderChange('ambient')}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
      <Typography color='#fff'>Waves</Typography>
      <Slider
        value={soundFXVolume}
        onChange={handleSliderChange('soundFX')}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
      <Typography color='#fff'>Music</Typography>
      <Slider
        value={musicVolume}
        onChange={handleSliderChange('music')}
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />
    </Box>
  )
}

export default VolumeControls
