import React, { useState } from 'react';
import { Auth } from './Auth';

function NavigationBar({loggedIn,setLoggedIn}) {


  return (
    <div >
      <nav>
        <ul className='flex justify-between items-center'>
          <li className='list-none'><a href="/">Home</a></li>
          <li className='list-none'><a href="/about">About</a></li>
          
            <li><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></li>
        
        
        
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
