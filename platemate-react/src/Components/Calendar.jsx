import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../Components/UserContext';
import { MyMeals } from './MyMeals';
import { IndividualMeal } from './IndividualMealCard';

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
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-col items-center h-fit">
            <h1 className="text-3xl mb-4">Calendar</h1>
            <div className="flex flex-row"> {sharedMeals && allMeals && sharedMeals.map((meal, index) => {
                console.log(meal)
                console.log(allMeals[index])
                if (meal[1] !== allMeals[index].userName) {
                    return (
                        <>
                            Sharing <IndividualMeal meal={allMeals[index]} /> </>)
                }
                else {
                    return <>with {meal[1]} on {meal[2]}</>
                }
            })}
            </div>
        </section>
    );
};


export default Calendar;