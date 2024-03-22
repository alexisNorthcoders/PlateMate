import React, { useEffect, useState } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, get ,remove} from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const MyMeals = () => {
    const [user, loading, error] = useAuthState(auth);
    const [meals, setMeals] = useState(null)
    const handleTrashIconClick = (mealId) => {
        const mealRef = ref(database, `/meals/${mealId}`);
                        remove(mealRef).then(() => {
                            console.log('Meal removed from the database.');
                        }).catch((error) => {
                            console.error('Error removing meal:', error);
                        });

    }
    useEffect(() => {
        if (user) {
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
        }
    }
        , [user]);
    return (<>
        {meals && meals.map((meal, index) => {
            return (
                <article key={index} className="w-[230px] text-black p-0.5 mx-2 my-4 max-w-sm bg-gradient-to-br from-teal-200 via-teal-600 to-teal-900 rounded-lg shadow-lg items-center ">
                    <div className="bg-white  pb-5 rounded-lg  flex flex-col items-center">
                        <FontAwesomeIcon icon={faTrash} onClick={()=>handleTrashIconClick(meal.mealId)} className="text-2xl text-red-300 self-end ml-2 mr-2 mt-2 hover:text-red-600 hover:cursor-pointer hover:scale-150 transition ease-in-out active:text-red-800 active:scale-110 " />
                        <p className="text-xl  border-b-2 border-teal-300 ">{meal.name}</p>
                        <p className="text-sm ">Notes: {meal.description}</p>
                        <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-teal-800 shadow-lg" />
                        <p className="text-sm ">Quantity: {meal.quantity <= 0 ? "Not available" : meal.quantity}</p>
                    </div>

                </article>
            );
        })}
    </>)
}

