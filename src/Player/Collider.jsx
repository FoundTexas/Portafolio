import React, { useEffect } from 'react';

const LinkCollider = ({ position, playerPos }) => {
  useEffect(() => {
    // Add collision detection logic here
    const handleCollision = () => {
      // Perform collision actions here
      // For example, load a URL
      onCollision('https://example.com');
    };

    // Add event listeners or collision detection logic here
    // You can use the position prop to determine the collider's position

    return () => {
      // Remove event listeners or cleanup logic here if needed
    };
  }, [position, onCollision]);

  return (
    <div
      className="link-collider"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '40px', // Adjust the size as needed
        height: '40px',
        background: 'blue', // Adjust the style as needed
        zIndex: 1, // Ensure it's above other elements
      }}
    ></div>
  );
};

export default LinkCollider;
