import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"

import settings from "../../services/settings.service"
import scenarioService from "../../services/scenario.service"
import { ScenarioCard } from "./ScenarioCard"
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { cards } from "./scenarioData"
import { Box, textAlign } from "@mui/system"
import { defaultGridSpacing } from "../../utilities/constants"
import { Instruction } from "../components/Instruction"

const imgStyle = {
  width: "30%",
  height: "auto",
}

export const Scenarios = (props) => {
  useEffect(() => {
    props.setHeader("Story Selection")
  }, [props])

  const navigate = useNavigate()

  const [selectedCard, setSelectedCard] = useState(null)

  const clickHandler = (card) => {
    const user = window.localStorage.getItem('user') || 'kayla'
    scenarioService.setSituation(`${user}_${card.selection}`)
    navigate('/story/')
  }

  return !selectedCard ? (
    <>
      <Stack spacing={4}>
        <Grid container spacing={defaultGridSpacing}>
          {cards.map((card, index) => (
            <Grid key={`index_${index}`} xs={12} md={6}>
              <ScenarioCard
                key={card.id}
                card={card}
                clickHandler={clickHandler}
              />
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ textAlign: "center" }}>
          Made for Kayla
        </Typography>
      </Stack>
    </>
  ) : (
    <Grid container md={6}>
      <Grid>
        <Card>
          <CardMedia
            sx={{ height: 240 }}
            image={`${selectedCard.image}`}
            title={selectedCard.title}
          />
          <CardContent>
            <Typography variant="h5">
              Loading {selectedCard.title}...
            </Typography>
            <Typography variant="subtitle">{selectedCard.subtitle}</Typography>
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
