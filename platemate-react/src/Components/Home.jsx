import React from 'react';

const Home = () => {
  const meals = [
        { id: 1, name: 'Meal 1', description: 'Description of Meal 1' },
        { id: 2, name: 'Meal 2', description: 'Description of Meal 2' },
        { id: 3, name: 'Meal 3', description: 'Description of Meal 3' },
    ];

    return (
        <div>
            <h1>Home Page</h1>
            {meals.map((meal) => (
                <div key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                </div>
            ))}
        </div>
    );
};


export default Home;