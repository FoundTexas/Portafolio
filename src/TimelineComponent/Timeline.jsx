import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web';
import './timeline.css';

const Timeline = () => {
  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 500 });

  return (

    <Parallax pages={3}>

      <ParallaxLayer sticky={{ start: 0, end: 1 }} factor={1} speed={0} style={{ backgroundSize: 'cover', backgroundColor: '#87BCDE000' }} />
      <ParallaxLayer offset={0.3} speed={-0.3} >
        <img src={`url('/yaocaliSun.png')`} style={{ width: '100%', marginLeft: '70%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={0.3} speed={0.3}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <img src={`url('/pyramid.png')`} style={{ width: '100%', marginLeft: '70%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={0.3} speed={-0.3} >
        <img src={`url('/yaocaliSun.png')`} style={{ width: '100%', marginLeft: '70%' }} />
      </ParallaxLayer>


      <ParallaxLayer sticky={{ start: 0.75, end: 2 }} speed={0}
        syle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div className='container d-flex'>
          <iframe frameborder="0" src="https://itch.io/embed/1345654?bg_color=0e0013&amp;fg_color=ffffff&amp;link_color=b86e2a&amp;border_color=504855" width="208" height="167"><a href="https://foundtexas.itch.io/yaocalli">YAOCALLI by FoundTexas, Charlestone0, Tenextiic</a></iframe>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.3} style={{ backgroundColor: '#f55', backgroundSize: 'cover', backgroundImage: `url('/yaocali.png')` }} />


      <ParallaxLayer offset={2} speed={0}>

        <p>This is a simple landing page using react-spring animations.</p>

      </ParallaxLayer>

    </Parallax>
  );
};

export default Timeline;
