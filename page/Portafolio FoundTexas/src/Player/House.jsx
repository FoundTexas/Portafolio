import React, { Component } from 'react';

class House extends Component {
  render() {
    const { position } = this.props;
    const { player } = this.props;
    const { link } = this.link;

    const distance = Math.sqrt((position.x - player.x)^2 + (position.y - player.y)^2)


    console.log(distance);

    if (distance < 1 ) {
      window.location.href = 'https://example.com';
    }

    return (
      <div
        className="house"
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
      ></div>
    );
  }
}

export default House;
