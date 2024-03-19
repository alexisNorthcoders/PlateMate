import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';


export default function NavigationBar({ loggedIn, setLoggedIn }) {

  return (
    <div className='bg-conifer-950 p-2 h-screen flex justify-center '>
      <nav>
        <ul className='justify-center'>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900 mb-2' to={loggedIn ? "Home" : "/"}>Home</Link></li>
        {loggedIn && <> <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900 mb-2' to={`Calendar`}>Calendar</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900 mb-2' to={`Chat`}>Chat</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900 mb-2' to={`Profile`}>Profile</Link></li>
          <li> <Link className='btn bg-conifer-700 hover:bg-conifer-800 active:bg-conifer-900 mb-2' to={`UploadMeal`}>Upload Meal</Link></li></> }
        
          <li><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></li>
        </ul>
      </nav>
    </div>
  );
}

