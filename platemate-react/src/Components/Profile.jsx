import React, { useEffect, useState } from 'react';
import { database } from "../config/firebase";
import {  ref,get } from 'firebase/database';

const Profile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
       
        const dbRef = ref(database, 'users');
        get(dbRef)
          .then((snapshot) => {
           
            setData(snapshot.val());
          })
          .catch((error) => {
            
            console.error('Error fetching data:', error);
          });
      }, [database]);
    
    
    return (
        <section className="bg-conifer-900 text-white py-16 flex flex-col">
            <h1>Profile</h1>
           <p>Name</p>
           <p>Description / allergens</p>
           <p>Avatar picture</p>
           <p> Current Meal</p>
           <p> Previous Meals</p>
           <p> Requests notifications</p>
           {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </section>
    );
};

export default Profile;
