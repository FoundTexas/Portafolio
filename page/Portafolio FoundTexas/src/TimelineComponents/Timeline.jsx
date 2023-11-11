import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Timeline.css';

const timelineTexts = [
  'Event 1',
  'Event 2',
  'Event 3',
  'Event 4',
  'Event 5',
];

function Timeline() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      const scrollThreshold = 100;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timelineSpring = useSpring({
    left: isScrolled ? `${scrollY / 5}px` : '0px',
    opacity: isScrolled ? 1 : 0,
  });

  return (
    <div className="app">
      <h1>Scroll Animation</h1>
      <p>Scroll down to see the animation</p>

      <div className="timeline">
        {timelineTexts.map((text, index) => (
          <animated.div key={index} className="timeline-event" style={{ ...timelineSpring }}>
            {text}
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
