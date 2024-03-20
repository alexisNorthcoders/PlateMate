import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get, set, update ,remove} from 'firebase/database';
import { Meals } from './Meals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Requests = () => {
    const [user, loading, error] = useAuthState(auth);
    const [messages, setMessages] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [requestMessage, setRequestMessage] = useState(null)

    const handleAccept = (e, message) => {
        e.preventDefault();
        setShowModal(true)
        setRequestMessage(message)
    }

    const closeModal = () => {
        setShowModal(false);
    };
    const updateMessage = (messageId, newStatus) => {
        const messageRef = ref(database, `messages/${messageId}`);

        update(messageRef, { status: newStatus })
            .then(() => {
                console.log("Message updated successfully");
            })
            .catch((error) => {
                console.error("Error updating message:", error);
            });
    };
    const deleteMessage = (messageId) => {
        const messageRef = ref(database, `messages/${messageId}`);
    
        remove(messageRef)
            .then(() => {
                console.log("Message deleted successfully");
                setMessages((prevMessages) => prevMessages.filter(message => message.messageId !== messageId))
            })
            .catch((error) => {
                console.error("Error deleting message:", error);
            });
    };
    useEffect(() => {
        const messagesRef = ref(database, `messages`);

        get(messagesRef).then((snapshot) => {


            const messagesObject = snapshot.val()
            const filteredMessages = [];
            Object.entries(messagesObject).forEach(([messageId, message]) => {
                if (message.receiverId === user.uid) {
                    filteredMessages.push({ messageId, ...message });
                }
            });
            console.log(filteredMessages)
            setMessages(filteredMessages)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 py-5 flex flex-col items-center h-full">
            {showModal && <Meals requestMessage={requestMessage} closeModal={closeModal} updateMessage={updateMessage} />}
            <h1 className="text-3xl mb-4">Requests</h1>
            <article>
                {messages && messages.map((message, index) => {
                    return (
                        <div key={`${message.receiverId}_${index}`} className="bg-teal-200  shadow-teal-900 shadow-inner text-black flex flex-col items-center p-1 rounded-lg mb-0.5">
                            <div className="flex flex-row self-start">
                                <div className='flex flex-row'>
                                    <img src={message.senderAvatar} alt="sender avatar picture" className='w-10 h-10 rounded-full shadow-md' />
                                </div>
                                <p>[{message.timestamp.substring(11, 19)}] <span className='text-lg font-bold'>{message.senderName}</span> {message.content} </p>
                            </div>
                            <div className="flex bg-teal-300 w-fit rounded-sm shadow-teal-600 shadow-inner"> {message.status ? <p className='text-green-900 font-bold'>You have already {message.status} this offer.</p> : <button className='flex h-10 w-24 text-md font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800  ' onClick={(e) => { handleAccept(e, message) }}>View Offer</button>}
                            </div> <FontAwesomeIcon icon={faTrash} onClick={()=>{deleteMessage(message.messageId)}}className="text-lg text-red-500 self-end ml-2 mr-2 mt-2 hover:text-red-700 hover:cursor-pointer active:text-red-900" />

                        </div>)

                })}
            </article>
        </section>
    );
};


export default Requests;