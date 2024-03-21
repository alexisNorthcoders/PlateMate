import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../Components/UserContext';
import { IndividualMeal } from './IndividualMealCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'

const Calendar = () => {
    const [user, loading, error] = useAuthState(auth);
    const { userData } = useContext(UserContext)
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





    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-wrap items-center h-full pl-4">

            <div className="flex flex-row flex-wrap items-center">
                {sharedMeals && sharedMeals.map((meal, index) => {

                    return (
                        <div key={meal.id} className='flex-col text-center'>
                            <h1 className='text-2xl bg-teal-500 rounded-l-lg '>{meal.day} </h1>
                            <div className="flex flex-row items-center">
                                <IndividualMeal mealId={meal.mealId_user1} />
                                <FontAwesomeIcon className="text-3xl"icon={faRightLeft}/>
                                <IndividualMeal mealId={meal.mealId_user2} />
                            </div>
                        </div>

                    )

                })}
            </div>
        </section>
    );
};


export default Calendar;