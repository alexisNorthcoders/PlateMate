import { ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

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


const data = {
    recipes: {
        recipe1: {
            name: "Spaghetti Carbonara",
            ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese", "black pepper"],
            instructions: "Cook spaghetti, fry bacon, mix with eggs and cheese, season with pepper."
        },
        recipe2: {
            name: "Chicken Tikka Masala",
            ingredients: ["chicken", "yogurt", "tomato sauce", "spices", "cream"],
            instructions: "Marinate chicken in yogurt and spices, grill, then simmer in tomato sauce and cream."
        },

    },

};


set(rootRef, data)
    .then(() => {
        console.log("Data seeded successfully!");
        process.exit();
    })
    .catch((error) => {
        console.error("Error seeding data:", error);
        console.log("Firebase app disconnected due to error.");
        process.exit(1);
    });