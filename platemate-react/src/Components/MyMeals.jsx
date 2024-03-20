import React, { useEffect, useState } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, get } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';

export const MyMeals=()=>{
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [data, setData] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const [meals, setMeals] = useState(null)

    useEffect(() => {
        if (user) {
            const dbRef = ref(database, `users/${user.uid}`);
            get(dbRef)
                .then((snapshot) => {
                    const userData = snapshot.val()
                    setData(userData);
                    setProfilePictureUrl(userData.url);
                    const mealsRef = ref(database, `meals`);
                    get(mealsRef)
                        .then((snapshot) => {
                            const mealsData = snapshot.val();
                            const userMeals = Object.values(mealsData).filter(meal => meal.userId === user.uid);
                            console.log(userMeals)
                            setMeals(userMeals)
                        })
                        .catch((error) => {
                            console.error('Error fetching meals:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);
    return (<>
    {meals && meals.map((meal, index) => {
        return (
            <article key={index} className="text-black p-0.5 mx-2 my-4 max-w-sm bg-gradient-to-br from-teal-200 via-teal-600 to-teal-900 rounded-lg shadow-lg items-center h-full">
                <div className="bg-white  p-5 rounded-lg hover:bg-green-50 flex flex-col items-center">
                <p className="text-xl  border-b-2 border-teal-300 ">{meal.name}</p>
    
                <p className="text-sm ">Notes: {meal.description}</p>
                
                <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-teal-800 shadow-lg" />
                <p className="text-sm ">Quantity: {meal.quantity}</p>
                
                </div>
            </article>
        );
    })}
   </>)
}

