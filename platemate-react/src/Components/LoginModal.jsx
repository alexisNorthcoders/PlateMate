import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { ref, set } from 'firebase/database';
import { database } from "../config/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const LoginModal = ({ showModal, toggleModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    class User {
        constructor(userEmail, userPassword) {
            this.userEmail = userEmail;
            this.userPassword = userPassword;
        }

        async login() {
            await signInWithEmailAndPassword(auth, this.userEmail, this.userPassword);
            navigateTo('/Home');
            toggleModal();
        }
    }
    const john = new User("person1@example.com", "password");
    const alice = new User("person2@example.com", "password");
    const jane = new User("person3@example.com", "password");
    const arthur = new User("person4@example.com", "password");

    const signIn = async (e) => {
        e.preventDefault()
        try {
            const user = new User(email, password)
            setEmail('');
            setPassword('');
            await user.login()


        } catch (err) {
            console.log(err)
            if (err.code === "auth/invalid-credential") {
                setErrorMessage("Invalid password or email!");
            }

        }
    };
    const signUp = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(database, `users/${user.uid}`), {
                email: user.email,

            });
            setEmail('');
            setPassword('');
            setErrorMessage('');
            navigateTo('/Home');
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use");
            }
            else if (err.code === "auth/invalid-email") {
                setErrorMessage("Invalid email");
            }
            else if (err.code === "auth/weak-password") {
                setErrorMessage("Password is too weak");
            }
        };
    }
    return (<>
        {showModal && (
            <div className="fixed top-0 z-1">
                <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div
                        className="inline-block bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-gradient-to-b from-slate-200 to-slate-300  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full items-center ">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-left">
                                    <div><span className="text-2xl">Quick Login as </span>
                                        <button className=" border-2 border-green-500 bg-gradient-to-bl from-green-100 to-green-200 ml-1 rounded-lg text-xl p-1 hover:to-green-100 active:to-green-900 " onClick={()=>john.login()}>John</button>
                                        <button className=" border-2 border-green-500 bg-gradient-to-bl from-green-100 to-green-200 ml-1 rounded-lg text-xl p-1 hover:to-green-100 active:to-green-900" onClick={()=>alice.login()}>Alice</button>
                                        <button className=" border-2 border-green-500 bg-gradient-to-bl from-green-100 to-green-200 ml-1 rounded-lg text-xl p-1 hover:to-green-100 active:to-green-900" onClick={()=>arthur.login()}>Arthur</button>
                                        <button className=" border-2 border-green-500 bg-gradient-to-bl from-green-100 to-green-200 ml-1 rounded-lg text-xl p-1 hover:to-green-100 active:to-green-900" onClick={()=>jane.login()}>Jane</button>
                                    </div>
                                    <div className="w-full  mt-2 mb-4 flex flex-col items-center">
                                        <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Email' />
                                        </div>
                                        <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Password' />
                                        </div>
                                        {errorMessage && <p className="bg-white rounded-lg p-1 w-fit font-bold text-red-500">{errorMessage}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-teal-800  px-1 py-1 w-[500px] ">
                            <button type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 transition-transform duration-150 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={signIn}
                            >
                                Log In
                            </button>
                            <button className="w-full bg-green-600 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-green-700 active:bg-green-800 active:transform active:scale-95 transition-transform duration-150  sm:ml-3 sm:w-auto sm:text-sm" onClick={signUp}> Register</button>

                            <button
                                type="button"
                                className="w-full bg-red-500 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-red-700 active:bg-red-800 active:transform active:scale-95 transition-transform duration-150 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        )}</>)
}