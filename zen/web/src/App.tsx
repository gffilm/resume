import React, { useState } from 'react'
import Zen from './Zen'
import { Button, Box } from '@mui/material'
import './styles.css'

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
      bgcolor="#f5f5f5"
    >
      {!showZen ? (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleStart}
          size="large"
        >
          Start Zen
        </Button>
      ) : (
        <Zen />
      )}
    </Box>
  )
}

export default App
