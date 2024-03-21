import React, { createContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get, set, onValue } from 'firebase/database';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (user) {
      const dbRef = ref(database, `users/${user.uid}`);
      onValue(dbRef, (snapshot) => {
        setUserData(snapshot.val())
      });

    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};