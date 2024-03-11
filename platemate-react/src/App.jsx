import './App.css'
import Home from './Components/Home'
import NavigationBar from './Components/NavigationBar'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (<>
    <div className='sticky top-0 bg-white'><NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>
    <Home/>
  </>)
}

export default App
