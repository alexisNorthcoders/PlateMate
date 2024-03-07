import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      setLoggedIn(true);
    } catch (err) {
      console.log(err)
      if (err.code === "auth/invalid-credential") {
        setErrorMessage("Invalid password or email!");
      }
     
    }
  };
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setSuccessMessage('Created account successfully!');
      setErrorMessage('');
      setLoggedIn(true);
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
  const logOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setSuccessMessage('Logged out successfully!');

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <label htmlFor="email" className="block"> Email:
        <input className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500" placeholder="Email.." id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="password" className="block">Password:
        <input className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500" type="password" id="password" value={password} placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
      </label>
     {loggedIn ? <button className="w-full bg-gray-400 text-gray font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-gray-500 active:bg-gray-600 active:transform active:scale-95 transition-transform duration-150" onClick={logOut}> logOut</button> : <div> <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 transition-transform duration-150" onClick={signIn}> Signin</button>
      
      <button className="w-full bg-green-600 text-white font-bold py-2 px-4 mb-1 rounded focus:outline-none hover:bg-green-700 active:bg-green-800 active:transform active:scale-95 transition-transform duration-150" onClick={signUp}> SignUp</button></div>} 
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};