import React from 'react';

const Menu = ({
  setBrushColor,
  setBrushWidth,
  setBrushOpacity,
  setTool,
}) => {
  return (
    <div className="menu">
      <label>Brush Color:</label>
      <input type="color" onChange={(e) => setBrushColor(e.target.value)} />


      <label>Tool:</label>
      <select onChange={(e) => setTool(e.target.value)}>
        <option value="brush">Brush</option>
        <option value="eraser">Eraser</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="line">Line</option>
        <option value="triangle">Triangle</option>
        <option value="oval">Oval</option>
        <option value="fill">Fill Color</option>
      </select>

      
      <label>Brush Width:</label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => setBrushWidth(e.target.value)}
      />

      <label>Brush Opacity:</label>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        onChange={(e) => setBrushOpacity(e.target.value)}
      />

      
    </div>
  );
};

export default Menu;
