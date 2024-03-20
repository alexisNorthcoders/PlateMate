import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get,set } from 'firebase/database';
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from 'firebase/storage';

const UploadMeal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [picture, setPicture] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(null)

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
                        set(ref(database, `meals/${Date.now()}`), {
                        
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
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <section className="bg-teal-900 text-white py-5 flex flex-col items-center h-full">
            <h1 className="text-3xl mb-8">Upload your Meal</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black focus:outline-none focus:bg-white" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg mb-2">Description / allergens</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black focus:outline-none focus:bg-white" required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-lg mb-2">Quantity</label>
                    <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black focus:outline-none focus:bg-white" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="picture" className="block text-lg mb-2">Picture</label>
                    <input type="file" id="picture" onChange={(e) => setPicture(e.target.files[0])} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black focus:outline-none focus:bg-white" required />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">Upload</button>
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
                {uploadError && <p className="text-red-500">{uploadError}</p>}
            </form>
        </section>
    );
};



export default UploadMeal;