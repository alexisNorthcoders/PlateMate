export const IndividualMeal = ({ meal }) => {

    return (
        <article className="text-black p-0.5 w-[230px] mx-2 my-4 max-w-sm bg-gradient-to-br from-teal-200 via-teal-600 to-teal-900 rounded-lg shadow-lg items-center">
            <div className="bg-white  p-5 rounded-lg hover:bg-green-50 flex flex-col items-center">
                <p className="text-xl  border-b-2 border-teal-300 ">{meal.name}</p>
                <p className="text-sm ">Notes: {meal.description}</p>
                <p className="text-sm ">Cook: {meal.userName}</p>
                <img src={meal.pictureUrl} alt="meal picture" className="w-32 border-2 rounded-lg border-teal-800 shadow-lg" />
               

            </div>
        </article>
    );


}

