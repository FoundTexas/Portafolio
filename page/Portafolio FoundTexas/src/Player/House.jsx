// House.js
import React from 'react';

const House = ({ position }) => {
  return (
    <div
      className="house"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    ></div>
  );
};

export default House;
