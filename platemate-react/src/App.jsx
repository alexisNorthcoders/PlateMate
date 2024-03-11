import React from 'react';

import { Outlet } from "react-router-dom";
import AboutPage from './Components/About';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Hero from './Components/Hero';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
   
      <div>
        <div className='sticky top-0 bg-white'><NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>
      <Outlet/>
      </div>
   
  );
}

export default App;