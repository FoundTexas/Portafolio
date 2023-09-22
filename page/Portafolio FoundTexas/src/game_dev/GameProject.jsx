import { useState } from 'react'
import React from 'react';
import './GameProject.css'; // Import your CSS file

const GameProject = ({ children,title, description, link}) => {

  const imageSrc = 'url/${title}'
  return (
    <div className="game-container">
      <h2 className="game-title">{title}</h2>
      <p className="game-description">{children}</p>
      <a href={link} className="game-button" target="_blank" rel="noopener noreferrer">
        Play Now
      </a>
    </div>
  );
};

export default GameProject;
