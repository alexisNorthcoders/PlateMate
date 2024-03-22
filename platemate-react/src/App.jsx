import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);


  const toggleNavBar = () => {
    setShowNavBar(!showNavBar);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      setShowNavBar(false)
    }
    else if (window.innerWidth > 768) {
      setShowNavBar(true)
    }
  };
  const handleMouseLeave = () => {
    if (isMobile) {
      setShowNavBar(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex">
      {isMobile ? (
        <div className="fixed top-0 left-0 p-4">
          <button onClick={toggleNavBar}>

            <FontAwesomeIcon className="text-4xl" icon={faBars} />

          </button>
        </div>
      ) : null}
      <div className={`absolute inset-y-0 left-0 transform ${!showNavBar ? "-translate-x-full" : null} md:relative md:translate-x-0 transition duration-200 ease-in-out`} onMouseLeave={handleMouseLeave}>
        <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>

      <div className="bg-teal-600 flex-1 p-0.5">
        <Outlet />
      </div>
    </div>

  );
}

export default App;