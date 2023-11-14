import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Timeline from './TimelineComponent/Timeline.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Timeline></Timeline>
    </>
  )
}

export default App
