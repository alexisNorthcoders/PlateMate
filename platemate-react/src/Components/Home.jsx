import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../Components/UserContext';


const Home = () => {
    const [meals, setMeals] = useState(null)
    const [user, loading, error] = useAuthState(auth);
    const { userData } = useContext(UserContext)
    console.log(userData)
    useEffect(() => {
        const mealsRef = ref(database, `meals`);
        get(mealsRef).then((snapshot) => {
            const mealsData = Object.values(snapshot.val())
            console.log(mealsData)
            const filteredMeals = mealsData.filter((meal) => meal.userId !== user.uid)
            setMeals(filteredMeals)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    const sendMessage = async (userId, meal) => {
        try {
            const currentDate = new Date();
            await push(ref(database, "messages"), {
                senderId: user.uid,
                senderName: userData.name,
                senderAvatar:userData.url,
                receiverId: userId,
                content: `wants to PlateMate your ${meal}. Are you interested?`,
                timestamp: currentDate.toISOString(),
            });

        } catch (error) {
            console.error("Error sending message:", error);

        }
    };
    return (
        <section className="bg-conifer-900 text-white py-5 h-full flex flex-col items-center">

            <h1 className="text-3xl mb-4 font-light">Available Meals</h1>
            <div className="flex flex-wrap justify-around">
                {meals && meals.map((meal, index) => {
                    return (
                        <article key={index} className="p-0.5 mx-2 my-4 max-w-sm bg-gradient-to-r from-conifer-800 via-conifer-100 to-conifer-950 rounded-lg shadow-md items-center">
                            <div className="bg-gradient-to-br from-conifer-700  to-conifer-800  p-5 rounded-lg">
                            <p className="text-xl text-conifer-100 font-light border-b-2 border-conifer-300">{meal.name}</p>

                            <p className="text-sm font-light text-conifer-100">Notes: {meal.description}</p>
                            <p className="text-sm font-light text-conifer-100">Cook: {meal.userName}</p>
                            <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-conifer-800 shadow-lg" />
                            <p className="text-sm font-light text-conifer-100">Available: {meal.quantity}</p>
                            <button onClick={() => { sendMessage(meal.userId, meal.name) }} className='font-bold text-conifer-100 bg-conifer-600 border-opacity-15 border-2  border-conifer-100 drop-shadow-md shadow-conifer-950 p-1 rounded-lg  text-sm hover:bg-conifer-700 active:bg-conifer-800'>PlateMate Request</button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};


export default Home;