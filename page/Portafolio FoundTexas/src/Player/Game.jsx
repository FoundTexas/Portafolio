import React, { useState, useEffect } from 'react';
import './Game.css';
import House from './House';
import Player from './Player';
import Collider from './Collider';

const Game = () => {
  const gameContainerWidth = 800;
  const gameContainerHeight = 600;
  const worldBoundX = 400;
  const worldBoundY = 350;
  const playerSize = 40;
  const moveDistance = 10;
  const camMoveDist = 10;


  const [playerPosition, setPlayerPosition] = useState({
    x: (gameContainerWidth - playerSize) / 2,
    y: (gameContainerHeight - playerSize) / 2,
  });

  const [worldPosition, setWorldPosition] = useState({ x: 0, y: 0 });

  const housePositions = [
    { x: 20, y: 20 },
    { x: -50, y: -50 },
    { x: 80, y: 80 },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      let dir = { x: 0, y: 0 };
      let newWP = { x: worldPosition.x, y: worldPosition.y };

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

      const newPlayerX = playerPosition.x + dir.x;
      const newPlayerY = playerPosition.y + dir.y;

      if (checkCollisions(newPlayerX, newPlayerY, newWP)) {
        setPlayerPosition({ x: newPlayerX, y: newPlayerY });

        if (
          newPlayerX < gameContainerWidth / 4 &&
          newWP.x > -worldBoundX &&
          dir.x < 0
        ) {
          setWorldPosition((prev) => ({ ...prev, x: newWP.x - camMoveDist }));
        } else if (
          newPlayerX > gameContainerWidth - gameContainerWidth / 4 &&
          newWP.x < worldBoundX &&
          dir.x > 0
        ) {
          setWorldPosition((prev) => ({ ...prev, x: newWP.x + camMoveDist }));
        }

        if (
          newPlayerY < gameContainerHeight / 4 &&
          newWP.y > -worldBoundY &&
          dir.y < 0
        ) {
          setWorldPosition((prev) => ({ ...prev, y: newWP.y - camMoveDist }));
        } else if (
          newPlayerY > gameContainerHeight - gameContainerHeight / 4 &&
          newWP.y < worldBoundY &&
          dir.y > 0
        ) {
          setWorldPosition((prev) => ({ ...prev, y: newWP.y + camMoveDist }));
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, worldPosition]);

  const checkCollisions = (newPlayerX, newPlayerY, newWP) => {
    let collided = false;

    housePositions.forEach((house) => {
      const adjustedHouse = { x: house.x - newWP.x, y: house.y - newWP.y };
      if (
        newPlayerX + playerSize >= adjustedHouse.x &&
        newPlayerX <= adjustedHouse.x + playerSize + 20 &&
        newPlayerY + playerSize >= adjustedHouse.y &&
        newPlayerY <= adjustedHouse.y + playerSize + 20
      ) {
        console.log('Player collided with a house at', adjustedHouse);
        //house.props.handleCollision();
        collided = true;
      }
    });

    if (
      newPlayerX < 0 ||
      newPlayerX > gameContainerWidth - playerSize ||
      newPlayerY < 0 ||
      newPlayerY > gameContainerHeight - playerSize
    ) {
      collided = true;
    }

    return !collided;
  };

  const playerpos = { x: playerPosition.x - worldPosition.x, y: playerPosition.y - worldPosition.y };

  return (
    <div
      className="game-container"
      tabIndex="0"
      style={{
        width: `${gameContainerWidth}px`,
        height: `${gameContainerHeight}px`,
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
        {housePositions.map((position, index) => (
          <House key={index} position={position} player={playerpos}/>
        ))}
      </div>

      <Player position={playerPosition} />
    </div>
  );
};

export default Game;
