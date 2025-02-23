import React, { useRef, useState, useEffect } from "react";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas context and set up event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set up drawing properties
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#000000";

    // Handle mouse/touch events
    const startDrawing = (event: MouseEvent | TouchEvent) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = getEventCoordinates(event);
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = getEventCoordinates(event);
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    // Add event listeners for mouse
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Add event listeners for touch
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    // Cleanup event listeners
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [isDrawing]);

  // Helper function to get coordinates from mouse/touch events
  const getEventCoordinates = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    const rect = canvas.getBoundingClientRect();
    let offsetX, offsetY;

    if (event instanceof MouseEvent) {
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
    } else if (event.touches && event.touches.length > 0) {
      offsetX = event.touches[0].clientX - rect.left;
      offsetY = event.touches[0].clientY - rect.top;
    } else {
      offsetX = 0;
      offsetY = 0;
    }

    return { offsetX, offsetY };
  };

  // Capture the canvas image and send it to the backend
  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to a data URL (base64 image)
    const image = canvas.toDataURL("image/png");

    // Send the image to the backend
    try {
      const response = await fetch("/api/upload-drawing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (response.ok) {
        console.log("Drawing saved successfully!");
      } else {
        console.error("Failed to save drawing.");
      }
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Draw on the Canvas</h1>
      <canvas
        ref={canvasRef}
        width={310}
        height={500}
        style={{ border: "1px solid #000", touchAction: "none" }}
      />
      <button
        onClick={saveDrawing}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Drawing
      </button>
    </div>
  );
};

export default DrawingCanvas;
