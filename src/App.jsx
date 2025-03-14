import React, { useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import './App.css';

function App() {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(8);
  const [brushOpacity, setBrushOpacity] = useState(0.5);
  const [isDraw, setIsDraw] = useState(false);
  const [tool, setTool] = useState('brush');
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = brushOpacity;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctxRef.current = ctx;
  }, [brushColor, brushWidth, brushOpacity]);

  const startDraw = (e) => {
    startX.current = e.nativeEvent.offsetX;
    startY.current = e.nativeEvent.offsetY;

    if (tool === 'brush' || tool === 'eraser' || tool === 'fill') {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startX.current, startY.current);
      setIsDraw(true);
    }
  };

  const endDraw = (e) => {
    if (tool === 'rectangle' || tool === 'circle' || tool === 'line' || tool === 'triangle' || tool === 'oval') {
      const endX = e.nativeEvent.offsetX;
      const endY = e.nativeEvent.offsetY;
      const ctx = ctxRef.current;
      ctx.beginPath();

      if (tool === 'rectangle') {
        ctx.fillStyle = brushColor;
        ctx.fillRect(
          startX.current,
          startY.current,
          endX - startX.current,
          endY - startY.current
        );
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(endX - startX.current, 2) + Math.pow(endY - startY.current, 2)
        );
        ctx.arc(startX.current, startY.current, radius, 0, 2 * Math.PI);
        ctx.fillStyle = brushColor;
        ctx.fill();
      } else if (tool === 'line') {
        ctx.moveTo(startX.current, startY.current);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (tool === 'triangle') {
        ctx.moveTo(startX.current, startY.current);
        ctx.lineTo(endX, startY.current);
        ctx.lineTo((startX.current + endX) / 2, endY);
        ctx.closePath();
        ctx.fillStyle = brushColor;
        ctx.fill();
      } else if (tool === 'oval') {
        ctx.ellipse(
          (startX.current + endX) / 2,
          (startY.current + endY) / 2,
          Math.abs(endX - startX.current) / 2,
          Math.abs(endY - startY.current) / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = brushColor;
        ctx.fill();
      }
    } else if (tool === 'fill') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = brushColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setIsDraw(false);
  };

  const draw = (e) => {
    if (!isDraw) return;
    const ctx = ctxRef.current;
    if (tool === 'brush') {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  return (
    <div className="App">
      <h1 className="gradient-text">Paint App</h1>
      <div className="draw-area">
        <Menu
          setBrushColor={setBrushColor}
          setBrushWidth={setBrushWidth}
          setBrushOpacity={setBrushOpacity}
          setTool={setTool}
        />
        <canvas
          width="1200px"
          height="500px"
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
        ></canvas>
      </div>
      <footer className="footer">
        <p className="footer-text">
          &copy;2025<a href='https://linkedin.com/in/rupakch16'>@rupakchakraborty</a>.All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
