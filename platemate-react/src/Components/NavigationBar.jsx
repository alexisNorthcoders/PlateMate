import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';


export default function NavigationBar({ loggedIn, setLoggedIn }) {
  return (
    <div className='bg-conifer-950 p-2'>
      <nav>
        <ul className='flex justify-between items-center'>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900' to={`Home`}>Home</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900' to={`Calendar`}>Calendar</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900' to={`Chat`}>Chat</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900' to={`UploadMeal`}>Upload Meal</Link></li>
          <li><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></li>
        </ul>
      </nav>
    </div>
  );
}

