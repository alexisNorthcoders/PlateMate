import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push,update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../Components/UserContext';
import { MyMeals } from './MyMeals';


const Home = () => {
    const [meals, setMeals] = useState(null)
    const [user, loading, error] = useAuthState(auth);
    const { userData } = useContext(UserContext)
    const [isRequestSent,setIsRequestSent]=useState(false)
    
    useEffect(() => {
        const mealsRef = ref(database, `meals`);
        get(mealsRef).then((snapshot) => {
            const mealsData = Object.values(snapshot.val())
            console.log(mealsData)
            const filteredMeals = mealsData.filter((meal) => meal.userId !== user.uid)
            setMeals(filteredMeals)
            console.log(filteredMeals, "filtered meals")
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    const handleClickRequest=(userid, meal) =>{
        setIsRequestSent(prevStatuses => ({
            ...prevStatuses,
            [meal.mealId]: true,
        }));
        updateRequestedMeal(meal)
        sendMessage(userid,meal)
    }

    const sendMessage = async (userId, meal) => {
        try {
            const currentDate = new Date();
            await push(ref(database, "messages"), {
                senderId: user.uid,
                senderName: userData.name,
                senderAvatar: userData.url,
                receiverId: userId,
                mealId:meal.mealId,
                content: `wants to PlateMate your ${meal.name}. Are you interested?`,
                timestamp: currentDate.toISOString(),
            });

        } catch (error) {
            console.error("Error sending message:", error);

        }
    };
    const updateRequestedMeal = async ( meal) => {
        const userRef = ref(database, `users/${user.uid}/requestedMeals/`);
        
        update(userRef,{ [meal.mealId]:"pending"})
            .then(() => {
                console.log("User shared meals updated successfully");
                console.log(userData, "userdata in home screen")
            })
            .catch((error) => {
                console.error("Error updating message:", error);
            });
    };
    return (<>
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 pt-5 flex flex-col items-center ">

            <h1 className="text-3xl mb-4 ">Available Meals</h1>
            <div className="flex flex-wrap justify-around">
                {meals && meals.map((meal, index) => {
                    return (
                        <article key={index} className="text-black w-[230px]  p-0.5 mx-2 my-4 max-w-sm bg-gradient-to-br from-teal-200 via-teal-600 to-teal-900 rounded-lg shadow-lg items-center">
                            <div className="bg-white  p-5 rounded-lg hover:bg-green-50 flex flex-col items-center">
                                <p className="text-xl  border-b-2 border-teal-300 ">{meal.name}</p>

                                <p className="text-sm ">Notes: {meal.description}</p>
                                <p className="text-sm ">Cook: {meal.userName}</p>
                                <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-teal-800 shadow-lg" />
                                <p className="text-sm ">{meal.quantity ? `Quantity: ${meal.quantity}`: "Not available"}</p>
                             {isRequestSent[meal.mealId] || (userData.requestedMeals && userData.requestedMeals[meal.mealId]) ? <div className='font-bold text-teal-950 bg-teal-300 border-opacity-15 border-2  border-teal-100 drop-shadow-md shadow-teal-800 p-1 rounded-lg  text-sm  '>Request Sent</div> : <button onClick={() => { handleClickRequest(meal.userId, meal) }} className='font-bold text-teal-100 bg-teal-600 border-opacity-15 border-2  border-teal-100 drop-shadow-md shadow-teal-950 p-1 rounded-lg  text-sm hover:bg-teal-700 active:bg-teal-800 '>PlateMate Request</button>}   
                            </div>
                        </article>
                    );
                })}

            </div>
        </section>
        <section className="bg-gradient-to-b from-slate-300 to-slate-400  text-teal-950 flex flex-col items-center">
            <h1 className="text-3xl mb-4">My Meals</h1>
            <div className="flex justify-around">
                <MyMeals />
            </div>
        </section>
    </>
    );
};


export default Home;