import React, { useEffect, useState } from 'react';
import { firebase } from "../config/firebase";

const Profile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
  
        const dbRef = firebase.database().ref('users');
    
        
        dbRef.once('value', (snapshot) => {
          setData(snapshot.val());
        });
      }, []);
    
    
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
