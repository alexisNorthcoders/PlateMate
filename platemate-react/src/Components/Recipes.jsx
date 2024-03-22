import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from './UserContext';
import { IndividualMeal } from './IndividualMealCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'

export const Recipes = () => {
    const [user, loading, error] = useAuthState(auth);
    const [sharedMeals, setSharedMeals] = useState(null)

    useEffect(() => {
        if (user) {
            const mealshareRef = ref(database, `mealShares/`);
            get(mealshareRef).then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const mealsArray = Object.keys(data).map(key => ({
                        ...data[key],
                        id: key,
                    }));
                    setSharedMeals(mealsArray);

                } else {
                    setSharedMeals([]);
                }
            }).catch((error) => {
                console.error(error);
            });

        }
    }, [user]);
    if (!user) {
        return <div>Please sign in to view your profile.</div>;
    }
    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 pt-5 flex flex-col items-center h-full ">
            <h1 className="text-3xl mb-4 ">Recipe AI Generator</h1>
            
        </section>
    );
};