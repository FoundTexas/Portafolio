// Game.js
import React, { useState, useEffect } from 'react';
import './Game.css';
import House from './House';

const Game = () => {
  const gameContainerWidth = 800; // Set the width of your game container
  const gameContainerHeight = 600; // Set the height of your game container

  const [playerPosition, setPlayerPosition] = useState({
    x: (gameContainerWidth - 40) / 2, // Centered horizontally
    y: (gameContainerHeight - 40) / 2, // Centered vertically
  });

  const housePositions = [
    { x: 20, y: 20 },
    { x: -50, y: -50 },
    { x: 80, y: 80 },
    // Add more house positions as needed
  ];

  useEffect(() => {
    checkCollisions();
  }, [playerPosition]);

  const handleKeyPress = (e) => {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (e.key == ('w' || 'ArrowUp')) { newY -= 10; }
    if (e.key == ('s' || 'ArrowDown')) { newY += 10; }
    if (e.key == ('a' || 'ArrowLeft')) { newX -= 10; }
    if (e.key == ('d' || 'ArrowRight')) { newX += 10; }

    setPlayerPosition({ x: newX, y: newY });
  };

  const checkCollisions = () => {
    housePositions.forEach((house) => {
      if (
        playerPosition.x + 40 >= house.x &&
        playerPosition.x <= house.x + 60 &&
        playerPosition.y + 40 >= house.y &&
        playerPosition.y <= house.y + 60
      ) {
        console.log('Player collided with a house at', house);
      }
    });
  };

  return (
    <div
      className="game-container"
      onKeyDown={handleKeyPress}
      tabIndex="0"
      style={{
        width: `${gameContainerWidth}px`, // Set the width of the game container
        height: `${gameContainerHeight}px`, // Set the height of the game container
        overflow: 'hidden', // Hide content outside the game container
        position: 'relative', // To position houses and player
      }}
    >
      {housePositions.map((position, index) => (
        <House key={index} position={position} />
      ))}
      <div
        className="player"
        style={{
          top: `${playerPosition.y}px`,
          left: `${playerPosition.x}px`,
        }}
      ></div>
    </div>
  );
};

export default Game;
