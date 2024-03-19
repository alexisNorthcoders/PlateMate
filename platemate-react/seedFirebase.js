import { ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const rootRef = ref(database);
const auth =  getAuth(app);


const data = {
    recipes: {
        recipe: {
            name: "Spaghetti Carbonara",
            ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese", "black pepper"],
            instructions: "Cook spaghetti, fry bacon, mix with eggs and cheese, season with pepper."
        },
        recipe2: {
            name: "Chicken Tikka Masala",
            ingredients: ["chicken", "yogurt", "tomato sauce", "spices", "cream"],
            instructions: "Marinate chicken in yogurt and spices, grill, then simmer in tomato sauce and cream."
        },

    }

};
const meals = [
    {name:"Pasta Meatballs", quantity:2},
    {name:"Chicken Curry", quantity:4} ,
    {name:"Chicken Fried Rice", quantity:3}

]
const users = [
    { email: "person1@example.com", password: "password" ,name:"John" },
    { email: "person2@example.com", password: "password", name:"Alice"},
    { email: "person3@example.com", password: "password", name:"Jane" },

]

async function seedUsers(){
   try{

    for (let i=0;i<users.length;i++) {
    console.log("creating credentials")
        const userCredential = await createUserWithEmailAndPassword(auth, users[i].email, users[i].password);
        const user = userCredential.user;
        console.log("adding users to database")
        await set(ref(database, `users/${user.uid}`), {
            email: user.email,
            name: users[i].name
        });
        console.log("adding meals to database")
        await set(ref(database, `meals/${i}`), {
            name: meals[i].name,
            quantity: meals[i].quantity,
            userId:user.uid,
            userName:users[i].name
        });
    }
    console.log("adding recipes to database")
   await set(ref(database, `recipes/`), data.recipes)
   console.log("Data seeded successfully!");
   process.exit()
} 
catch (error) {
    console.log("Error with firebase", error);
    process.exit()
}
}

seedUsers()