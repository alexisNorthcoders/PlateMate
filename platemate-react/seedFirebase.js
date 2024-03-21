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
            recipeId:0,
            name: "Spaghetti Carbonara",
            ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese", "black pepper"],
            instructions: "Cook spaghetti, fry bacon, mix with eggs and cheese, season with pepper."
        },
        {
            recipeId:1,
            name: "Chicken Tikka Masala",
            ingredients: ["chicken", "yogurt", "tomato sauce", "spices", "cream"],
            instructions: "Marinate chicken in yogurt and spices, grill, then simmer in tomato sauce and cream."
        },

    ]

};
const meals = [
    { name: "Pasta Meatballs", quantity: 2, description:`gluten, dairy`, url: `https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/meatballs.jpeg?alt=media&token=054ce1a9-cf69-4a49-a9b3-d63017ce5cf3` },
    { name: "Chicken Curry", quantity: 4,description:"dairy" ,url:`https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/chickencurry.jpeg?alt=media&token=8bae6c83-37c6-4244-aeb6-d15545ae1c84`},
    { name: "Chicken Fried Rice", quantity: 3, description:"gluten free", url:`https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/chickenfriedrice.jpeg?alt=media&token=913e7150-b784-4301-9324-5829f1719bb6`},
    { name: "Steak Pie", quantity: 1,description:"gluten",url:`https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/steakalepie.jpeg?alt=media&token=67e0d227-05da-4bba-936a-f15e7783ce8e`},

]
const users = [
    { email: "person1@example.com", password: "password", name: "John", url: `https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/avatar1.jpeg?alt=media&token=29bceeda-a61c-4ce1-9793-5c86fd95a5c4` },
    { email: "person2@example.com", password: "password", name: "Alice", url: `https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/avatar2.jpeg?alt=media&token=cab8beb0-f39e-4936-a85c-433d906941b1` },
    { email: "person3@example.com", password: "password", name: "Jane", url: `https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/avatar4.jpeg?alt=media&token=e160ddbf-f797-4e1f-9d30-3936f7909c69` },
    { email: "person4@example.com", password: "password", name: "Arthur", url: `https://firebasestorage.googleapis.com/v0/b/platemate-3fe13.appspot.com/o/avatar3.jpeg?alt=media&token=a0727d6e-b86a-497b-9dcc-a8cc21c3c647` },
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
                uid:user.uid,
                email: user.email,
                name: users[i].name,
                url: users[i].url
            });
            console.log("adding meals to database")
            await set(ref(database, `meals/${i}`), {
                mealId:i,
                name: meals[i].name,
                quantity: meals[i].quantity,
                description:meals[i].description,
                userId: user.uid,
                userName: users[i].name,
                date: new Date().toISOString(),
                pictureUrl:meals[i].url || null

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