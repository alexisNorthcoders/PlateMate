import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';


export default function NavigationBar({ toggleModal }) {
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
    <div className='bg-gradient-to-b from-slate-300 to-teal-800  p-2 h-full'>
      <nav className='flex flex-col items-center'>
      <img src="PlateMate.png" alt="Plate Mate Logo" className="mx-auto w-40 mb-2" />
        <ul className='items-center justify-center'>
          <li> <Link className=' flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2 ' to={user ? "Home" : "/"}>Home</Link></li>
          {user && <> <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`PlateMate`}>PlateMate Meals</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Requests`}>Requests</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Profile`}>Profile</Link></li>
            <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`UploadMeal`}>Upload Meal</Link></li>
             <li> <Link className='flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2' to={`Recipes`}>Recipe Generator</Link></li></>
            }

         

        </ul>
        <Auth toggleModal={toggleModal}/>
        {user && <img src={profilePictureUrl} alt="Profile" className="w-32 border-2 border-black rounded-full mb-1 shadow-lg"/>}
      </nav>
    </div>
  );
}

