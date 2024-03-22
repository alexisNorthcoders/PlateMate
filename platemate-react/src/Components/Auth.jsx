import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth';



export const Auth = ({ toggleModal }) => {
  const navigateTo = useNavigate();
  const [user] = useAuthState(auth);

  const logOut = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth);
      navigateTo('/');

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="max-w-md mx-auto">
      {!user ? (
        <>
          <button
            className="flex h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-blue-600  hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 transition-transform duration-150"
            onClick={toggleModal}
          ><div className="flex flex-row justify-between items-center"><span className=""></span><span className="">Log In</span><FontAwesomeIcon className="" icon={faRightToBracket} /></div>
          </button>

        </>
      ) : <button className="text-lg font-bold w-full bg-gray-400 text-gray py-2 px-4 mb-1 rounded focus:outline-none hover:bg-gray-500 active:bg-gray-600 active:transform active:scale-95 transition-transform duration-150" onClick={logOut}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out</button>}


    </div>
  );
};