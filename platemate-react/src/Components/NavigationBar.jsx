import React, { useState } from 'react';
import { Auth } from './Auth';

export default function NavigationBar({loggedIn,setLoggedIn}) {


  return (
    <div className='bg-conifer-950 p-2'>
      <nav>
        <ul className='flex justify-between items-center'>
          <li className='list-none text-white'>Home</li>
          <li className='list-none text-white'>About</li>
          
            <li><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></li>
        
        
        
        </ul>
      </nav>
    </div>
  );
}

