import React, { useState } from "react"
import { Button } from "@mui/material"

export const Words = ({ text, onWordClick }) => {
  // Split the text into individual words
  const words = text.split(" ")

  const [highlightedWords, setHighlightedWords] = useState([])

  const toggleHighlight = (word) => {
    if (highlightedWords.includes(word)) {
      // If the word is already highlighted, remove it from the list
      setHighlightedWords((prevHighlightedWords) =>
        prevHighlightedWords.filter((w) => w !== word)
      )
    } else {
      // If the word is not highlighted, add it to the list
      setHighlightedWords((prevHighlightedWords) => [
        ...prevHighlightedWords,
        word,
      ])
    }
  }

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            cursor: "pointer",
            margin: "0.15rem",
            padding: "0.3rem",
            borderRadius: ".5rem",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            display: "inline-block",
            fontSize: "1em",
            backgroundColor: highlightedWords.includes(word) ? "#389DFF" : "transparent",
            transform: highlightedWords.includes(word) ? "scale(1)" : "scale(1.1)"
          }}
          onClick={() => {
            toggleHighlight(word)
            onWordClick(word)
          }}
          onMouseEnter={(e) => {
            if (!highlightedWords.includes(word)) {
              e.target.style.backgroundColor = "#2372C8"
              e.target.style.transform = "scale(1.1)"
            }
          }}
          onMouseLeave={(e) => {
            if (!highlightedWords.includes(word)) {
              e.target.style.backgroundColor = "transparent"
              e.target.style.transform = "scale(1)"
            }
          }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
