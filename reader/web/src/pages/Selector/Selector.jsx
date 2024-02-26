import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import settings from "../../services/settings.service";
import scenarioService from "../../services/scenario.service";
import { ScenarioCard } from "./../Scenarios/ScenarioCard";
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
  Button, // Added Button component
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { categories } from "./categories";

import { Box, textAlign } from "@mui/system";
import { defaultGridSpacing } from "../../utilities/constants";
import { Instruction } from "../components/Instruction";

const imgStyle = {
  width: "30%",
  height: "auto",
};

export const Selector = (props) => {
  useEffect(() => {
    props.setHeader("Category Selection");
  }, [props]);

  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null)
  const [user, setUser] = useState(localStorage.getItem('user'))

  const clickHandler = (card) => {
    scenarioService.setSituation(card.selection);
    navigate(`/${card.category}/`);
  };

  const handleUserSelection = (user) => {
    setUser(user)
    window.localStorage.setItem('user', user)
  };

  return (
    <>
      <Stack spacing={4}>
        {/* User Selection Buttons */}
        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
           <Button
            variant={user === "kayla" ? "contained" : "outlined"}
            sx={{ color: "white", margin: 1 }}
            onClick={() => {
              handleUserSelection("kayla");
            }}
          >
            Kayla
          </Button>
          <Button
            variant={user === "pinchy" ? "contained" : "outlined"}
            sx={{ color: "white", margin: 1 }}
            onClick={() => {
              handleUserSelection("pinchy");
            }}
          >
            Pinchy
          </Button>
        </Box>

        {/* Scenario Cards */}
        <Grid container spacing={defaultGridSpacing}>
          {categories.map((card, index) => (
            <Grid key={`index_${index}`} xs={12} md={6}>
              <ScenarioCard
                key={card.id}
                card={card}
                user={user}
                clickHandler={clickHandler}
              />
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Typography sx={{ textAlign: "center" }}>Made for Kayla</Typography>
      </Stack>
    </>
  );
};
