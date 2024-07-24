import React, { useState, useEffect } from 'react'
import { CircularProgress, Box } from '@mui/material'

const ImageLoader = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setImageLoaded(true)
  }, [src])

  return (
    <Box 
      style={{
        opacity: 1,
        transition: 'opacity 0.5s', 
        width: '100%', 
        height: '100%'
      }} 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      className="image-loader">
        <img
        src={src}
        alt={alt}
        className={`full-screen-image`}
      />
    </Box>
  )
}

export default ImageLoader
