import axios from 'axios'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  
  useEffect(() => {
    axios.post('http://localhost:3001/signup', {username: 'Vladfigadf1', password: '2j8w6d123'}, {withCredentials: true})
    .then(data => console.log(data))
  }, [])
  return (
    <div className="App">

    </div>
  )
}

export default App
