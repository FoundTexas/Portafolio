import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './Timeline.css';

function Timeline() {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = containerRef.current.scrollTop;
      console.log(currentPosition);
      setScrollPosition(currentPosition);
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const circleSpring = useSpring({
    width: scrollPosition > 800 ? '900' : `${scrollPosition}px`, // Adjust the maximum size here
    height: scrollPosition > 800 ? '900' : `${scrollPosition}px`, // Adjust the maximum size here
    borderRadius: '50%',
    backgroundColor: 'blue',
  });

  return (
    <div className="app">
      <div className="container" style={{ overflow: 'auto' }} ref={containerRef}>
        {/* The container div has a limited height to enable scrolling */}
        <animated.div className="circle" style={circleSpring} />
        <div style={{ height: '3000px' }}>
          {/* Placeholder content to allow scrolling */}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
