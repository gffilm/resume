import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

const LoadingIndicator = () => {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CircularProgress
      sx={{
        color: '#ddd',
        position: 'absolute',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s',
      }}
    />
  )
}

export default LoadingIndicator
