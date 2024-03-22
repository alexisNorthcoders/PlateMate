import React, { useState, useEffect, useContext } from 'react';
import { database, auth, storage } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { askGPT } from '../utils/api';

export const Recipes = () => {
    const [user] = useAuthState(auth);
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e, prompt) => {
        e.preventDefault()
        setLoading(true)
        const response = await askGPT()
        setLoading(false)
        setApiResponse(response)
    }
    useEffect(() => {
        if (user) {
        }
    }, [user]);
    if (!user) {
        return <div>Please sign in to view your profile.</div>;
    }
    return (
        <section className="bg-gradient-to-b from-slate-200 to-slate-300  text-teal-950 pt-5 flex flex-col items-center h-full ">
            <h1 className="text-3xl mb-4 ">Recipe AI Generator</h1>

            <form onSubmit={handleSubmit} className='w-full  mt-2 mb-4 flex flex-col items-center'>
                <div className="p-1 rounded-full hover:bg-gradient-to-r focus-within:bg-gradient-to-r focus from-teal-200 via-teal-600 to-teal-900">
                    <label htmlFor="ingredients" className="sr-only">ingredients</label>
                    <input type="ingredients" id="ingredients" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="p-3 w-[350px] rounded-full border border-teal-500 focus:outline-none focus:border-transparent hover:border-transparent" placeholder='Insert ingredients...' />
                </div>

                <button className='flex mt-2 h-12 w-40 text-lg font-bold text-white justify-center items-center border-0 rounded-md cursor-pointer bg-teal-700 hover:bg-teal-800 active:bg-teal-900 mb-2'
                    disabled={loading || prompt.length === 0}
                    type="submit">
                    {loading ? "Generating recipe..." : "Generate"}
                </button>
            </form>
            <article className='px-5'>{
            apiResponse && (<pre className="whitespace-pre-wrap break-words overflow-x-auto text-teal-950 font-bold lg:text-lg xl:text-xl 2xl:text-2xl mb-8 text-left'">{apiResponse}</pre>)}
            </article>


        </section>
    );
};