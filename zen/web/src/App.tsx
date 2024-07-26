import React, { useState } from 'react'
import Zen from './Zen'
import { Button, Box, styled } from '@mui/material'
import './styles.css'

const DarkerButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#002d59',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: '#003365'
  }
}))

const App: React.FC = () => {
  const [showZen, setShowZen] = useState(false)

  const handleStart = () => {
    setShowZen(true)
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      bgcolor="#00041c"
    >
      {!showZen ? (
        <DarkerButton 
          variant="contained" 
          color="primary" 
          onClick={handleStart}
          size="large"
        >
          Start Zen
        </DarkerButton>
      ) : (
        <Zen />
      )}
    </Box>
  )
}

export default App
