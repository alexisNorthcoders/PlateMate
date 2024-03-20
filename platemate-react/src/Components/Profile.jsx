import React, { useEffect, useState } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, get } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';

const Profile = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [data, setData] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const [meals, setMeals] = useState(null)

    useEffect(() => {
        if (user) {
            const dbRef = ref(database, `users/${user.uid}`);
            get(dbRef)
                .then((snapshot) => {
                    const userData = snapshot.val()
                    setData(userData);
                    setProfilePictureUrl(userData.url);
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
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!user) {
        return <div>Please sign in to view your profile.</div>;
    }
    return (
        <section className="bg-conifer-900 text-white py-5 flex flex-col items-center">
            <h1 className='text-3xl font-bold'>Profile</h1>

            {data &&
                <div className="flex items-center">
                    <img src={profilePictureUrl} alt="Profile" className="w-32 border-2 border-black rounded-full hover:border-yellow-300 shadow-lg" />
                    <ul>
                        <li><p className="text-lg">Name: {data.name}</p></li>
                        <li><p className="text-lg">Email: {data.email}</p></li>
                    </ul>
                </div>
            }
            <div className="mb-4 bg-black rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold mb-2">My available meals:</p>
                {meals && meals.map((meal) => {
                    return (
                        <div>
                            <p className="text-lg">Meal name: {meal.name}</p>
                            <p className="text-lg">Quantity: {meal.quantity}</p>
                            <p className="text-lg">Notes: {meal.description}</p>
                            <img src={meal.pictureUrl||meal.url} alt="meal picture" className="w-32 border-2 border-black shadow-lg" />
                        </div>)
                })
                }
            </div>
        </section>
    );
};

export default Profile;
