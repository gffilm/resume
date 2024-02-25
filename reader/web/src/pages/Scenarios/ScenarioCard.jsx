import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import settings from "../../services/settings.service";

const useStyles = makeStyles((theme) => ({
  disabledCard: {
    opacity: 0.4,
    pointerEvents: "none",
  }
}));

export const ScenarioCard = ({ card, clickHandler }) => {
  const isCardActive = card.active;
  const classes = useStyles();

  return (
    <Card className={!isCardActive ? classes.disabledCard: ""}>
      <CardActionArea
        onClick={() => clickHandler(card)}
        disabled={!isCardActive}
      >
        <CardMedia sx={{ height: 200 }} image={`${settings.imagePath}/${card.image}`} title={card.title} />
        <CardContent>
          <Typography gutterBottom variant="h3">
            {card.title}
          </Typography>
          <Typography variant="body2">{card.subtitle}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
