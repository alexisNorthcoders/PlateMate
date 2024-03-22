import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/ErrorPage.jsx';
import Profile from './Components/Profile.jsx';
import Requests from './Components/Requests.jsx';
import UploadMeal from './Components/UploadMeal.jsx';
import Home from './Components/Home.jsx';
import Hero from './Components/Hero.jsx';
import AboutPage from './Components/About.jsx';
import { UserProvider } from './Components/UserContext'
import PlateMate from './Components/PlateMate.jsx';
import { Recipes } from './Components/Recipes.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Hero /> },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "About",
        element: <AboutPage />,
      },
      {
        path: "PlateMate",
        element: <PlateMate />,
      },
      {
        path: "Requests",
        element: <Requests />,
      },
      {
        path: "UploadMeal",
        element: <UploadMeal />,
      },
    
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "recipes",
        element: <Recipes/>
      }
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)