import React, { useState, useEffect } from 'react';
import './Game.css';
import House from './House';
import Player from './Player';

const Game = () => {
  const gameContainer = { x: 800, y: 600 };
  const worldBound = { x: 1600, y: 1200 };
  const playerSize = 40;
  const moveDistance = 10;
  const camMoveDist = 10;
  const [playerPosition, setPlayerPosition] = useState({
    x: (gameContainer.x - playerSize) / 2,
    y: (gameContainer.y - playerSize) / 2,
  });

  const [worldPosition, setWorldPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const housePositions = [
    { x: 20, y: 20, link: 'https://example.com' },
    { x: 200, y: 20, link: 'https://google.com' },
    { x: 100, y: 80, link: 'https://twitter.com' },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      let dir = { x: 0, y: 0 };

      if (e.key === 'w' || e.key === 'ArrowUp') {
        dir.y -= moveDistance;
      }
      if (e.key === 's' || e.key === 'ArrowDown') {
        dir.y += moveDistance;
      }
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        dir.x -= moveDistance;
      }
      if (e.key === 'd' || e.key === 'ArrowRight') {
        dir.x += moveDistance;
      }

      const newPlayerPos = { x: playerPosition.x + dir.x, y: playerPosition.y + dir.y };

      if (!checkCollisions(newPlayerPos)) {
        setPlayerPosition(newPlayerPos);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition]);

  const checkCollisions = (pos) => {
    if (pos.x < 0) {
      return true; // Player hit the left boundary
    } else if (pos.x + playerSize > worldBound.x) {
      return true; // Player hit the right boundary
    } else if (pos.y < 0) {
      return true; // Player hit the top boundary
    } else if (pos.y + playerSize > worldBound.y) {
      return true; // Player hit the bottom boundary
    }

    // Check for collisions with houses or other game elements here

    return false; // No collisions detected
  };

  return (
    <div
      className="game-container"
      tabIndex="0"
      style={{
        width: `${gameContainer.x}px`,
        height: `${gameContainer.y}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${-worldPosition.y}px`,
          left: `${-worldPosition.x}px`,
        }}
      >
        {housePositions.map((value, index) => (
          <House key={index} house={value} player={playerPosition} world={worldPosition} />
        ))}
      </div>

      <Player position={playerPosition} />
    </div>
  );
};

export default Game;
