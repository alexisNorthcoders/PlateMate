import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from './UserContext';
import { IndividualMeal } from './IndividualMealCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'

const PlateMate = () => {
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
            <h1 className="text-3xl mb-4 ">PlateMate Meals</h1>
            <div className="flex flex-wrap justify-around">
                {sharedMeals && sharedMeals.map((meal, index) => {

                    return (
                        <div key={meal.id} className='flex-col text-center mx-2'>
                            <div className='text-2xl bg-gradient-to-b from-teal-200 to-teal-600 p-1 rounded-lg '>
                            <h1 className='text-2xl bg-white  rounded-lg '>{meal.day} </h1></div>
                            <div className="flex flex-row items-center">
                                <IndividualMeal mealId={meal.mealId_user1} />
                                <FontAwesomeIcon className="text-3xl" icon={faRightLeft} />
                                <IndividualMeal mealId={meal.mealId_user2} />
                            </div>
                        </div>

                    )

                })}
            </div>
        </section>
    );
};


export default PlateMate;