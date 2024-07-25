import React, { useEffect, useState } from 'react'
import { Grid, Typography, styled } from '@mui/material'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const FadeTypography = styled(Typography)(({ theme }) => ({
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  '&.fade-enter-active': {
    opacity: 1,
  },
  '&.fade-exit': {
    opacity: 1,
  },
  '&.fade-exit-active': {
    opacity: 0,
  },
}))

const FadeText = ({ text, fadeOut, onComplete }) => {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true)
    })

    const hideTimer = setTimeout(() => {
      setShowText(false)
    }, 10000) 

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (fadeOut) {
      setShowText(false)
    }
  }, [fadeOut])

  return (
    <Grid className="text-overlay">
      <CSSTransition
        in={showText}
        timeout={10000}
        classNames="fade"
        mountOnEnter
        unmountOnExit
        onExited={onComplete}
      >
        <FadeTypography color="white" variant="h4">
          {text}
        </FadeTypography>
      </CSSTransition>
    </Grid>
  )
}

export default FadeText
