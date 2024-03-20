import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get, set,update } from 'firebase/database';
import { Meals } from './Meals';


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
            setMessages(filteredMessages)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    return (
        <section className="bg-conifer-900 text-white py-5 flex flex-col h-full ">
            {showModal && <Meals requestMessage={requestMessage} closeModal={closeModal} updateMessage={updateMessage} />}
            <h1>Requests</h1>
            {messages && messages.map((message, index) => {
                return (
                    <div key={`${message.receiverId}_${index}`} className="bg-conifer-200  shadow-conifer-900 shadow-inner text-black flex flex-col items-center pb-1 pt-1 pl-1 mb-0.5">
                        <div className="flex flex-row justify-center"> <img src={message.senderAvatar} alt="sender avatar picture" className='w-10 rounded-full shadow-md' /><p>[{message.timestamp.substring(11, 19)}] <span className='text-lg font-bold'>{message.senderName}</span> {message.content}</p></div>
                        <div className="flex justify-center bg-conifer-300 w-fit rounded-sm shadow-conifer-600 shadow-inner"> {message.status ? <p className='text-green-900 font-bold'>You have already {message.status} this offer.</p> : <button className='btn bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 transition-transform duration-150 ' onClick={(e) => { handleAccept(e, message) }}>View Offer</button>}  </div>
                    </div>)

            })}

        </section>
    );
};


export default Requests;