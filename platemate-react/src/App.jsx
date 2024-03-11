import './App.css'
import AboutPage from './Components/About'
import { Hero } from './Components/Hero'
import NavigationBar from './Components/NavigationBar'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (<>
    <div className='sticky top-0 bg-white'><NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>
    <Hero/>
    <AboutPage/>
  </>)
}

export default App
