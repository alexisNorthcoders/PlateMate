import { useEffect, useState } from "react"
import { database, auth, storage } from "../config/firebase";
import { ref, set, get, push } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



export const Meals = ({ requestMessage, closeModal, updateMessage }) => {
    const [meals, setMeals] = useState(null)
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoaded = (mealId) => {
        setLoadedImages({ ...loadedImages, [mealId]: true });
    };

    useEffect(() => {
        const mealsRef = ref(database, `meals`);
        get(mealsRef).then((snapshot) => {
            const mealsData = Object.values(snapshot.val())

            const filteredMeals = mealsData.filter((meal) => meal.userId === requestMessage.senderId)
            setMeals(filteredMeals)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    const handleDecline = async () => {
        await updateMessage(requestMessage.messageId, "declined")
        closeModal()
    }
    const handleAccept = async () => {
        await updateMessage(requestMessage.messageId, "accepted")
        closeModal()
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-800 opacity-80"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-teal-400 rounded-lg text-center text-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xs sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                > <div className="flex flex-row justify-between items-center"><h1 className="py-1 ml-2">Available meals</h1><FontAwesomeIcon icon={faXmark} onClick={closeModal} className="mr-2 bg-red-500 text-white rounded-sm px-0.5 shadow-lg hover:bg-red-600 active:bg-red-700 active:transform active:scale-75 transition-transform duration-150 " /></div>
                    <div className="bg-teal-100  px-4 border-teal-700 border-t-2 border-b-2 pb-2">

                        <div className="flex flex-col align-middle items-center">
                            <div className="mt-3 ">

                                {meals && meals.map((meal) => {
                                    return (
                                        <div key={meal.id} className="flex flex-col shadow-lg rounded-lg mb-2">
                                            <h2 className="">{meal.name}</h2>
                                            <div className={loadedImages[meal.id] ? '' : 'image-placeholder'}>
                                                {!loadedImages[meal.id] && <div className="spinner"></div>} 
                                                <img
                                                    src={meal.pictureUrl}
                                                    alt={`Picture of ${meal.name}`}
                                                    className={`w-44 rounded-lg shadow-md ${loadedImages[meal.id] ? 'visible' : 'hidden'}`}
                                                    onLoad={() => handleImageLoaded(meal.id)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="bg-teal-800 py-1 flex flex-row justify-center">

                        <button onClick={() => { handleAccept(requestMessage.messageId) }} className=" bg-green-600 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none hover:bg-green-700 active:bg-green-800 active:transform active:scale-95 transition-transform duration-150  sm:w-auto sm:text-sm" > Accept</button>

                        <button
                            type="button"
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-red-700 active:bg-red-800 active:transform active:scale-95 transition-transform duration-150 sm:w-auto sm:text-sm"
                            onClick={() => { handleDecline(requestMessage.messageId) }}
                        >
                            Decline
                        </button>

                    </div>
                </div>
            </div>
        </div>)
}