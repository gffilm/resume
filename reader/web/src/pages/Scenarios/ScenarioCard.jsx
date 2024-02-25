import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import settings from "../../services/settings.service";

export const ScenarioCard = ({ card, clickHandler }) => {
  const isCardActive = card.active;

  return (
    <Card>
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
