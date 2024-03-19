import React from 'react';
import { useState,useEffect } from 'react';
import { Outlet } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  
 
  const toggleNavBar = () => {
    setShowNavBar(!showNavBar);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 520);
    if (window.innerWidth <= 520){
      setShowNavBar(false)
    }
    else if (window.innerWidth > 520){
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
    <div className="flex">
       {isMobile ? (
        <div className="fixed top-0 left-0 p-4">
          <button onClick={toggleNavBar}>
            
            <span className="block w-6 h-1 bg-white rounded-full mb-1  hover:bg-conifer-950"></span>
         
          </button>
        </div>
      ) : null}
      {showNavBar && <div className="sticky top-0 h-screen" onMouseLeave={handleMouseLeave}>
      <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>}
    
    <div className="flex-1">
      <Outlet />
    </div>
  </div>
   
  );
}

export default App;