import React, { useEffect, useState, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { ref, get, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MyMeals } from './MyMeals';
import { UserContext } from '../Components/UserContext';
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from 'firebase/storage';

const Profile = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const [allergies, setAllergies] = useState('');
    const [showUpdateDetails, setShowUpdateDetails] = useState(false)
    const { userData } = useContext(UserContext)
    const [isDetailsChanged,setIsDetailsChanged]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userRef = ref(database, `/users/${userData.uid}`);
            await update(userRef, { name, allergies })
            setIsDetailsChanged(true)
            console.log('User profile updated in the database.');

        }
        catch (error) {
            setUploadError(error.message);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // upload file to storage
            const firebaseStorage = storageRef(storage, `${file.name}`);
            const uploadTask = uploadBytesResumable(firebaseStorage, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // change state of url
                        setProfilePictureUrl(url);
                        // update user url in the database
                        const userRef = ref(database, `/users/${userData.uid}`);
                        update(userRef, {
                            url: url,
                        }).then(() => {
                            console.log('Profile picture URL updated in the database.');
                        }).catch((error) => {
                            console.error('Error updating profile picture URL in the database:', error);
                        });
                    });
                }
            );
        }
    }
    const handleClickUpdateDetails = () => {
        setShowUpdateDetails(prev => !prev)
    }

    useEffect(() => {
        if (user) {
            console.log(userData, "userData")
            setProfilePictureUrl(userData.url);
            setName(userData.name)
            setAllergies(userData.allergies || null)
        }
    }, [userData]);
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
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-col items-center h-full">
            <h1 className="text-3xl mb-4">Profile</h1>

            {userData &&
                <div className="flex flex-col align-middle items-center">
                    <div className="flex ">
                        <label htmlFor="picture" className="sr-only">Picture</label>
                        <input type="file" id="picture" onChange={handleFileChange} className="hidden" required />


                    </div>
                    <img src={profilePictureUrl} onClick={() => document.getElementById('picture').click()} alt="Profile" className="cursor-pointer w-32 border-2 border-black rounded-full hover:border-yellow-300 shadow-lg" />
                    <form className="w-full  mt-2 mb-4 flex flex-col items-center" onSubmit={handleSubmit}>

                        <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Change your Name' />
                        </div>
                        <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <div id="name" className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Change your Name' >{userData.email}</div>
                        </div>
                        <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                            <label htmlFor="allergies" className="sr-only">Allergies</label>
                            <input type="text" id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Add your allergies or other dietary requirements'></input>
                        </div>
                        <button type="submit" className="mt-2 flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2">Update</button>{isDetailsChanged && <span className="text-2xl font-bold text-teal-600 border-b-4 border-teal-400">Details changed successfully!</span>}
                    </form>
                </div>

            }
           
            <h1 className="text-3xl mb-4 ">My Meals</h1>
            <div className="flex justify-around">
                <MyMeals />
            </div>
        </section>
    );
};

export default Profile;
