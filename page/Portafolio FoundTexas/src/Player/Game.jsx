// Game.js
import React, { useState, useEffect } from 'react';
import './Game.css';
import House from './House';

const Game = ({ className }) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
  const cameraBoundary = { minX: -100, minY: -100, maxX: 100, maxY: 100 };
  const housePositions = [
    { x: 20, y: 20 },
    { x: -50, y: -50 },
    { x: 80, y: 80 },
    // Add more house positions as needed
  ];

  const handleKeyPress = (e) => {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (e.key) {
      case 'ArrowUp':
        newY = Math.max(playerPosition.y - 10, cameraBoundary.minY);
        break;
      case 'ArrowDown':
        newY = Math.min(playerPosition.y + 10, cameraBoundary.maxY);
        break;
      case 'ArrowLeft':
        newX = Math.max(playerPosition.x - 10, cameraBoundary.minX);
        break;
      case 'ArrowRight':
        newX = Math.min(playerPosition.x + 10, cameraBoundary.maxX);
        break;
      default:
        break;
    }

    setPlayerPosition({ x: newX, y: newY });
  };

  const updateCameraPosition = () => {
    // Calculate the desired camera position to focus on the player
    const desiredCameraX = playerPosition.x - window.innerWidth / 2;
    const desiredCameraY = playerPosition.y - window.innerHeight / 2;

    // Clamp the camera position within the boundary
    const cameraX = Math.min(
      Math.max(desiredCameraX, cameraBoundary.minX),
      cameraBoundary.maxX - window.innerWidth
    );
    const cameraY = Math.min(
      Math.max(desiredCameraY, cameraBoundary.minY),
      cameraBoundary.maxY - window.innerHeight
    );

    setCameraPosition({ x: cameraX, y: cameraY });
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

  useEffect(() => {
    updateCameraPosition();
    checkCollisions();
  }, [playerPosition]);

  return (
    <div
      className={`game-container ${className}`}
      onKeyDown={handleKeyPress}
      tabIndex="0"
      style={{
        transform: `translate(${-cameraPosition.x}px, ${-cameraPosition.y}px)`,
      }}
    >
      {housePositions.map((position, index) => (
        <House key={index} position={position} />
      ))}
      <div
        className="player"
        style={{ top: `${playerPosition.y}px`, left: `${playerPosition.x}px` }}
      ></div>
    </div>
  );
};

export default Game;
