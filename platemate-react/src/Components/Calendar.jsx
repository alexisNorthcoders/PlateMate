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
    const [allMeals, setAllMeals] = useState(null)

    const parseSharedMealsData = (sharedMeals) => {
        const parsedMeals = []
        for (const key in sharedMeals) {
            const [_, __, name, weekday] = sharedMeals[key].split(",")
            parsedMeals.push([key, name, weekday])
        }
        return parsedMeals

    }
    const fetchMealById = async (mealId) => {
        const mealsRef = ref(database, `meals/${mealId}`);
        const snapshot = await get(mealsRef)
        const mealsData = snapshot.val();
        return mealsData
    }
    const fetchAllMealsByIds = async (meals) => {
        const mealsArray = []
        for (let i = 0; i < meals.length; i++) {
            const mealId = meals[i][0]
            const singleMeal = await fetchMealById(mealId)
            mealsArray.push(singleMeal)
        }
        setAllMeals(mealsArray)
        console.log(mealsArray)
    }
    useEffect(() => {
        if (user) {
            const parsedMeals = parseSharedMealsData(userData.shared_meals)
            setSharedMeals(parsedMeals)
            fetchAllMealsByIds(parsedMeals)


        }
    }, [])





    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-wrap items-center h-full pl-4">

            <div className="flex flex-row flex-wrap items-center">
                {sharedMeals && allMeals && sharedMeals.map((meal, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div key={meal.mealId} className='flex-col text-center'>
                                <h1 className='text-2xl bg-teal-500 rounded-l-lg '>{meal[2]} </h1>
                                <div className="flex flex-row items-center">
                                    <IndividualMeal meal={allMeals[index]} />
                                </div>
                            </div>)
                    }
                    else {
                        return (
                            <div key={meal.userName} className='flex-col text-center mr-1'>
                                <h1 className='text-2xl bg-teal-500 rounded-r-lg'> {meal[1]}</h1>
                                <div className="flex flex-row items-center">
                                    <IndividualMeal meal={allMeals[index]} />
                                </div>
                            </div>)
                    }
                })}
            </div>
        </section>
    );
};


export default Calendar;