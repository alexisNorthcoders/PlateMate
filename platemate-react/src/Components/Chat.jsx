import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { database, auth, storage } from "../config/firebase";
import { ref, get,set } from 'firebase/database';


const Chat = () => {
    const [user, loading, error] = useAuthState(auth);
    const [messages,setMessages]=useState(null)
    useEffect(() => {
        const messagesRef = ref(database, `messages`);
        get(messagesRef).then((snapshot) => {
            const messagesData = Object.values(snapshot.val())
            const filteredMessages = messagesData.filter((messages)=> messages.receiverId === user.uid)
            console.log(filteredMessages)
            
            setMessages(filteredMessages)
        })
            .catch((error) => {
                console.error('Error fetching meals:', error);
            });
    }
        , [])
    return (
        <section className="bg-conifer-900 text-white py-16 flex flex-col">
            <h1>Chat</h1>
            {messages && messages.map((message,index)=>{
                return (
                <div key={`${message.receiverId}_${index}`} className="bg-conifer-200 text-black">
                    <p>[{message.timestamp.substring(11,19)}] <span className='text-lg font-bold'>{message.senderName}</span>: {message.content}</p>
                    <p></p>
                    </div>)
            })}
        
        </section>
    );
};


export default Chat;