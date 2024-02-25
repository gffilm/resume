import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import CircularProgress from "@mui/material/CircularProgress"
import settings from "./../services/settings.service"

export const Welcome = (props) => {
   useEffect(() => {
    props.setHeader("Welcome")
  }, [props])

  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    props.setLoggedIn(loggedIn)
  }, [props, loggedIn])

  const successResponse = (response) => {
    setTimeout(() => {
      setLoggedIn(true)
       navigate('/scenario')
    }, 2000)
  }

  const failureResponse = (response) => {
    if (settings.production) {
      setLoading(false)
      return
    }
    setTimeout(() => {
      setLoggedIn(true)
       navigate('/scenario')
    }, 2000)
  }


  return (
      <div style={{textAlign:"center"}}>
          <h2>Welcome To Tutor!</h2>
          <div style={{ textAlign: 'center', margin: '3em' }}>
          {(loading &&
              <div style={{ textAlign: "center" }}>
                <h1>Logging in...</h1>
                <CircularProgress />
              </div>
            )}
          {(error && <h4 style={{ color: "#DC3545" }}>{error}</h4>)}
        </div>
      </div>
  )

}

