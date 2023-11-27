import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import './timeline.css';

const Timeline = () => {
  return (
    <Parallax pages={3} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={2.5}>
        <p>Parallax</p>
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={1}>
        <p>Parallax2</p>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Timeline;

function MyComponent() {
  return (
    <Parallax pages={1} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={2.5}>
        <p>Parallax</p>
      </ParallaxLayer>
    </Parallax>
  )
}
