import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { database } from "../config/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket,faRightToBracket } from '@fortawesome/free-solid-svg-icons'



export const Auth = ({ loggedIn, setLoggedIn }) => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("person1@example.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const signIn = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');

      setErrorMessage('');
      setLoggedIn(true);
      setShowModal(false)
      navigateTo('/Home');

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
      setLoggedIn(true);
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
  const logOut = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth);
      setLoggedIn(false);
      navigateTo('/');

    } catch (err) {
      console.error(err);
    }
  };
  const handleJohnClick = () => {
    setEmail("person1@example.com");
    setPassword("password")
  };
  const handleAliceClick = () => {
    setEmail("person2@example.com");
    setPassword("password")
  };
  const handleJaneClick = () => {
    setEmail("person3@example.com");
    setPassword("password")
  };
  const handleArthurClick = () => {
    setEmail("person4@example.com");
    setPassword("password")
  };

  return (
    <div className="max-w-md mx-auto">
      {!loggedIn ? (
        <>
          <button
            className="flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-blue-600  hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 transition-transform duration-150"
            onClick={openModal}
          ><div className="flex flex-row justify-between items-center"><span className=""></span><span className="">Log In</span><FontAwesomeIcon className=""icon={faRightToBracket} /></div>
          </button>
          {showModal && (
            <div className="fixed top-0 z-1">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-teal-600  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-screen">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div>Sign is as: <button className="bg-yellow-500 ml-1 rounded" onClick={handleJohnClick}>John</button><button className="bg-yellow-500 ml-1 rounded" onClick={handleAliceClick}>Alice</button><button className="bg-yellow-500 ml-1 rounded" onClick={handleArthurClick}>Arthur</button><button className="bg-yellow-500 ml-1 rounded" onClick={handleJaneClick}>Jane</button></div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                          Sign In
                        </h3>
                        <div className="mt-2">
                          <label htmlFor="email" className="block">
                            Email:
                            <input
                              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                              placeholder="Email.."
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </label>
                          <label htmlFor="password" className="block">
                            Password:
                            <input
                              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                              type="password"
                              id="password"
                              value={password}
                              placeholder="Password.."
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-teal-800  px-4 py-3 sm:px-6 sm:flex sm:flex-row">
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
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : <button className="text-lg font-bold w-full bg-gray-400 text-gray py-2 px-4 mb-1 rounded focus:outline-none hover:bg-gray-500 active:bg-gray-600 active:transform active:scale-95 transition-transform duration-150" onClick={logOut}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out</button>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

    </div>
  );
};