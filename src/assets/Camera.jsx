import React from 'react';

const Camera = ({ children, worldPosition }) => {
  const style = {
    position: 'absolute',
    top: `${-worldPosition.y}px`,
    left: `${-worldPosition.x}px`,
  };

  return <div style={style}>{children}</div>;
};

export default Camera;
