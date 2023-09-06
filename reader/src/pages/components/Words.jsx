import React from "react";
import { Button } from "@mui/material";

export const Words = ({ text, onWordClick }) => {
  // Split the text into individual words
  const words = text.split(" ");

  return (
    <div>
      {words.map((word, index) => (
          <span
          key={index}
          style={{
            cursor: "pointer",
            padding: '.5rem',
            borderRadius: ".5rem",
            transition: "transform 0.3s ease, background-color 0.3s ease", // Add transitions for transform and background color
            display: "inline-block", // Ensure the span element is treated as a block-level element
          }}
          onClick={() => onWordClick(word)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f0f0f0"; // Change background color on hover
            e.target.style.transform = "scale(1.1)"; // Scale the word on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent"; // Reset background color on mouse leave
            e.target.style.transform = "scale(1)"; // Reset scale on mouse leave
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
