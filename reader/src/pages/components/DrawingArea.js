import React, { useRef, useEffect } from "react";

export const DrawingArea = () => {
  const canvasRef = useRef(null);
  const drawingContext = useRef(null);

  useEffect(() => {
    // Initialize the canvas context
    const canvas = canvasRef.current;
    drawingContext.current = canvas.getContext("2d");
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = drawingContext.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent the default touch behavior (e.g., scrolling)
    
    const canvas = canvasRef.current;
    const context = drawingContext.current;
    const rect = canvas.getBoundingClientRect();
    if (!e.touches) {
      return
    }
    const touch = e.touches[0];

    if (touch) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      context.beginPath();
      context.moveTo(x, y);
      context.lineWidth = 2; // Set the line width as needed
      context.strokeStyle = "black"; // Set the stroke color
      context.lineCap = "round";
      context.lineJoin = "round";

      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);

      function handleTouchMove(e) {
        const touch = e.touches[0];
        const newX = touch.clientX - rect.left;
        const newY = touch.clientY - rect.top;
        context.lineTo(newX, newY);
        context.stroke();
      }

      function handleTouchEnd() {
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
    }
  };


  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1200} // Set the canvas width as needed
        height={600} // Set the canvas height as needed
        style={{
          border: "1px solid #000", // Add a border to the canvas
          cursor: "crosshair", // Change cursor to crosshair for drawing
        }}
        onMouseDown={(e) => {
          handleTouchStart(e);
        }}
        onTouchStart={(e) => {
          handleTouchStart(e);
        }}
      />
      <div style={{ textAlign: "center" }}>
        <button onClick={clearCanvas}>Clear Drawing</button>
      </div>
    </div>
  );
};

