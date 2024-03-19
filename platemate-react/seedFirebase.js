import { ref, set, remove, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword } from "firebase/auth";


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
const auth = getAuth(app);


const data = {
    recipes: [
        {
            name: "Spaghetti Carbonara",
            ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese", "black pepper"],
            instructions: "Cook spaghetti, fry bacon, mix with eggs and cheese, season with pepper."
        },
        {
            name: "Chicken Tikka Masala",
            ingredients: ["chicken", "yogurt", "tomato sauce", "spices", "cream"],
            instructions: "Marinate chicken in yogurt and spices, grill, then simmer in tomato sauce and cream."
        },

    ]

};
const meals = [
    { name: "Pasta Meatballs", quantity: 2, url: `gs://platemate-3fe13.appspot.com/meatballs.jpeg` },
    { name: "Chicken Curry", quantity: 4 },
    { name: "Chicken Fried Rice", quantity: 3 },
    { name: "Steak Pie", quantity: 1 },

]
const users = [
    { email: "person1@example.com", password: "password", name: "John", url: `gs://platemate-3fe13.appspot.com/avatar1.jpeg` },
    { email: "person2@example.com", password: "password", name: "Alice", url: `gs://platemate-3fe13.appspot.com/avatar2.jpeg` },
    { email: "person3@example.com", password: "password", name: "Jane", url: `gs://platemate-3fe13.appspot.com/avatar4.jpeg` },
    { email: "person4@example.com", password: "password", name: "Arthur", url: `gs://platemate-3fe13.appspot.com/avatar3.jpeg` },
]

async function signIn(email,password) {
   const user = await signInWithEmailAndPassword(auth,email,password)
   await deleteUser()
           
}
async function deleteUser() {
    const user = auth.currentUser;
    await user.delete()
    console.log("User deleted")
        
}
async function deleteData() {
    try {
        console.log("Deleting users credentials")
        
        for (const user of users) {
            await signIn(user.email,user.password)



        }

        console.log("Deleting database")
        await remove(ref(database));

        console.log("Data deleted successfully!");
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}
async function seedUsers() {
    try {

        for (let i = 0; i < users.length; i++) {
            console.log("creating credentials")
            const userCredential = await createUserWithEmailAndPassword(auth, users[i].email, users[i].password);
            const user = userCredential.user;
            console.log("adding users to database")
            await set(ref(database, `users/${user.uid}`), {
                email: user.email,
                name: users[i].name,
                url: users[i].url
            });
            console.log("adding meals to database")
            await set(ref(database, `meals/${i}`), {
                name: meals[i].name,
                quantity: meals[i].quantity,
                userId: user.uid,
                userName: users[i].name,
                date: new Date().toISOString(),
                url:meals[i].url || null

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

await deleteData()
seedUsers()