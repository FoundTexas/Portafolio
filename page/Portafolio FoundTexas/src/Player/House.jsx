import React, { useState, useEffect } from 'react';

const House = ({ house, player, world }) => {
  const [adjustedHouse, setadjustedHouse] = useState({ x: house.x, y: house.y });

  useEffect(() => {
    setadjustedHouse({ x: house.x - world.x, y: house.y - world.y });
    const distance = Math.sqrt(Math.pow(adjustedHouse.x - player.x, 2) + Math.pow(adjustedHouse.y - player.y, 2));
    if (distance < 0.2) {
      window.location.href = position.link;
    }
  }, [player, world]);

  return (
    <div
      className="house"
      style={{ top: `${adjustedHouse.y}px`, left: `${adjustedHouse.x}px` }}
    ></div>
  );
};

export default House;
