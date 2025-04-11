'use client';

import React, { useState } from 'react';

const ColorOptions = () => {
  const colorOptions = ['#EB5757', '#F2994A', '#F2C94C', '#27AE60', '#2F80ED', '#56CCF2', '#9B51E0', '#F955EB'];

  const [selectedColor, setSelectedColor] = useState('#2F80ED');
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {colorOptions.map((color) => (
        <div
          key={color}
          onClick={() => setSelectedColor(color)}
          style={{
            backgroundColor: color,
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: selectedColor === color ? '2px solid gray' : '',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

export default ColorOptions;
