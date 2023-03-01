import axios from 'axios'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

function login(){
  // axios.post('http://localhost:3001/signin', {username: 'Vladfigadf1', password: '2j8w6d123'}, {withCredentials: true})
  // .then(data => {
  //   console.log(data)
  //   return data
  // })
  // axios('http://localhost:3001/signin', {method: 'POST', data: {username: 'Vladfigadf1', password: '2j8w6d123'}, withCredentials: true})
  fetch('http://localhost:3001/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: 'Vladfi3gadf1', password: '2j8w6d123'})
  })
}



function App() {
  // axios("http://localhost:3001", {withCredentials: true})
  return (
    <div className="App">
      <button onClick={login}>Login</button>
    </div>
  )
}

export default App
