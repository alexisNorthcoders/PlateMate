import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get, set } from 'firebase/database';
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

const UploadMeal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [picture, setPicture] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(null)
    const [fileName, setFileName] = useState(`Picture of the meal`);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };

    useEffect(() => {
        if (user) {
            const dbRef = ref(database, `users/${user.uid}`);
            get(dbRef)
                .then((snapshot) => {
                    setUserData(snapshot.val())

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const firebaseStorage = storageRef(storage, `${picture.name}`)
            const uploadTask = uploadBytesResumable(firebaseStorage, picture);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setUploadProgress(progress);
                },
                (error) => {
                    setUploadError(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        const mealId = Date.now()
                        set(ref(database, `meals/${mealId}`), {
                            mealId,
                            name,
                            description,
                            quantity,
                            pictureUrl: url,
                            userName: userData.name,
                            userId: user.uid
                        });
                    });
                }
            );
            setName('');
            setDescription('');
            setQuantity('');
            setPicture(null);
            setUploadProgress(0);
            setUploadError(null);
            setFileName('')
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-col items-center h-full">
            <h1 className="text-3xl mb-4 ">Upload your Meal</h1>
            <form className="w-full max-w-sm " onSubmit={handleSubmit}>
                <div className="mb-4 p-1 rounded-full max-w-sm hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 w-full rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Name of the meal' required />
                </div>
                <div className="mb-4 p-1 rounded-full max-w-sm hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                    <label htmlFor="description" className="sr-only">Description / allergens</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 w-full rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Add allergens or other notes'></input>
                </div>
                <div className="mb-4 p-1 rounded-full max-w-sm hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                    <label htmlFor="quantity" className="sr-only">Quantity</label>
                    <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-3 w-full rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Number of portions' required />
                </div>
                <div className="">
                    <label htmlFor="picture" className="sr-only">Picture</label>
                    <input type="file" id="picture" onChange={handleFileChange} className="hidden" required />
                    <div className="mb-4 p-1 rounded-full max-w-sm hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                        <div className="p-3 w-full rounded-full bg-white border border-teal-500 focus:outline-none" onClick={() => document.getElementById('picture').click()} ><FontAwesomeIcon icon={faCloudArrowUp} onClick={() => document.getElementById('picture').click()} className='p-0 mr-3 text-3xl text-teal-500 hover:text-teal-600 active:text-teal-700 cursor-pointer' />{fileName} </div>
                    </div>

                </div>

                <button type="submit" className="flex ml-1 h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2">Upload</button>
                {uploadProgress > 0 && <p className='text-teal-800 font-bold text-xl'>Meal Uploaded: {uploadProgress}%</p>}
                {uploadError && <p className="text-red-500 font-bold text-xl">{uploadError}</p>}
            </form>
        </section>
    );
};



export default UploadMeal;