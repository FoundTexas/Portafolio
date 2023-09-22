import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import GameProject from './game_dev/GameProject.jsx'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <GameProject title="Ungravity" description="" link="" >
      description of the objects.
    </GameProject>
    < GameProject title="Ungravity" description="" link="" />
    < GameProject title="Ungravity" description="" link="" />

  </>
)
