import React, { createContext, useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get,set } from 'firebase/database';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (user) {
            const dbRef = ref(database, `users/${user.uid}`);
            get(dbRef)
                .then((snapshot) => {
                    setUserData(snapshot.val())
                    
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};