import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    const images = [
        { src: "./ella-olsson-lMcRyBx4G50-unsplash.jpg", alt: "Meal prep in 3 containers" },
        { src: "./ella-olsson-sosOqjx31Go-unsplash.jpg", alt: "Meal prep in 2 containers" },
        { src: "./ello-lQ2xKy3UHHI-unsplash.jpg", alt: "Someone holding a container with a grilled salmon" },
        { src: "./s-well-CJdZ800-Fbs-unsplash.jpg", alt: "Meal prep in 4 jars" }

    ];
    return (
        <section className="hero bg-teal-900 text-white py-16 flex flex-col">
            <div className="container mx-auto flex items-center">
                <div className="w-1/2">
                    <img src="./toa-heftiba-6bKpHAun4d8-unsplash.jpg" alt="People eating in a office canteen" className="mx-auto shadow-lg rounded-lg w-80vw" />
                </div>
                <div className="w-1/2 ml-5 text-center">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 ">Share Your Meal Prep with Friends and Coworkers</h1>
                    <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-8">Transform meal prep into a social experience with Plate Mate. Connect with friends and coworkers, share your favorite recipes, and enjoy healthier meals together.</p>
                    <button className="text-base lg:text-lg xl:text-xl 2xl:text-2xl bg-teal-600 hover:bg-teal-700 active:bg-teal-950 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"><Link to={"about"}>Learn More</Link></button>
                </div>
            </div>

            <div className="flex flex-wrap mx-auto mt-5">
                {images.map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} className="w-1/4 md:w-1/6 lg:w-1/8 rounded-lg mx-auto hover:-translate-y-2 transition-transform duration-300 ease-in-out" />
                ))}
            </div>
        </section>

    );
};

export default Hero;