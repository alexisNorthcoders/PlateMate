import React, { useState, useEffect } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set,get, push } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';


const Home = () => {
    const [meals, setMeals] = useState(null)
    const [user, loading, error] = useAuthState(auth);
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
    const sendMessage = async (userId,meal) => {
        try {
            
            await push(ref(database,"messages"),{
                senderId: user.uid,
                receiverId: userId,
                content: `Hi! I wanted to PlateMate your ${meal}. Are you interested?`,
                timestamp: Date.now(),
            });

        } catch (error) {
            console.error("Error sending message:", error);
            
        }
    };
    return (
        <section className="bg-conifer-900 text-white py-5 flex flex-col items-center">

            <h1 className="text-3xl mb-4">Available Meals</h1>
            <div className="flex flex-wrap justify-around">
                {meals && meals.map((meal, index) => {
                    return (
                        <div key={index} className="flex  flex-col mb-4 bg-conifer-700 rounded-lg shadow-md p-3 items-center">
                            <p className="text-xl font">{meal.name}</p>

                            <p className="text-sm">Notes: {meal.description}</p>
                            <p className="text-sm">Cook: {meal.userName}</p>
                            <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-conifer-800 shadow-lg" />
                            <p className="text-sm">Available: {meal.quantity}</p>
                            <button onClick={()=>{sendMessage(meal.userId,meal.name)}} className='bg-green-600 border-2  border-conifer-800 shadow-lg p-1 rounded-lg text-black text-sm hover:bg-green-700 active:bg-green-800'>Send PlateMate Request</button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


export default Home;