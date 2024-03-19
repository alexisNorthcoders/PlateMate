import React, { useState, useEffect } from 'react';
import { database } from "../config/firebase";
import { ref, get } from 'firebase/database';


const Home = () => {
    const [meals, setMeals] = useState(null)
    useEffect(() => {
        const mealsRef = ref(database, `meals`);
        get(mealsRef).then((snapshot) => {
            const mealsData = Object.values(snapshot.val())
            console.log(mealsData)
            setMeals(mealsData)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    return (
        <section className="bg-conifer-900 text-white py-16 flex flex-col">
            <h1>Home Page</h1>
            <p>Available Meals</p>
            <div className="flex flex-wrap justify-around">
                {meals && meals.map((meal, index) => {
                    return (
                        <div key={index} className="mb-4 bg-conifer-700 rounded-lg shadow-md p-4">
                            <p className="text-xl">{meal.name}</p>
                            <p className="text-sm">Available: {meal.quantity}</p>
                            <p className="text-sm">Notes: {meal.description}</p>
                            <p className="text-sm">Cook: {meal.userName}</p>
                            <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-conifer-800 shadow-lg" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


export default Home;