import React from 'react';
import { useParams } from 'react-router-dom';

const IndividualMeal = () => {
    const { id } = useParams();

    return (
        <section className="bg-conifer-900 text-white py-16 flex flex-col">
            <h1>Individual Meal</h1>
           <p>Name</p>
           <p>Description / allergens</p>
           <p>Quantity</p>
           <p> Picture</p>
       <button>Request Food!</button>
        </section>
    );
};


export default IndividualMeal;