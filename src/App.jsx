import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clima from './components/Clima'
import axios from 'axios'


function App() {
 

  return (
    <div className="App">
      <Clima/>
    </div>
  )
}

export default App
