import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';


export default function NavigationBar({ loggedIn, setLoggedIn }) {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const dbRef = ref(database, `users/${user.uid}`);
      get(dbRef)
        .then((snapshot) => {
          const userData = snapshot.val()
          const profilePictureRef = storageRef(storage, userData.url)

          getDownloadURL(profilePictureRef)
            .then((url) => {
              setProfilePictureUrl(url);
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  return (
    <div className='bg-teal-950 p-2 h-screen'>
      <nav className='flex flex-col items-center'>
        {user && <img src={profilePictureUrl} alt="Profile" className="w-32 border-2 border-black rounded-full hover:border-yellow-300 shadow-lg"/>}
        <ul className='items-center justify-center'>
          <li> <Link className=' flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2 ' to={loggedIn ? "Home" : "/"}>Home</Link></li>
          {loggedIn && <> <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Calendar`}>Calendar</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Requests`}>Requests</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Profile`}>Profile</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`UploadMeal`}>Upload Meal</Link></li></>}

          <li><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></li>

        </ul>
      </nav>
    </div>
  );
}

