import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './Components/NavigationBar.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import Profile from './Components/Profile.jsx';
import Chat from './Components/Chat.jsx';
import Calendar from './Components/Calendar.jsx';
import UploadMeal from './Components/UploadMeal.jsx';
import IndividualMeal from './Components/IndividualMeal.jsx';
import Home from './Components/Home.jsx';
import Hero from './Components/Hero.jsx';
import AboutPage from './Components/About.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
        path: "Calendar",
        element: <Calendar />,
      },
      {
        path: "Chat",
        element: <Chat />,
      },
      {
        path: "UploadMeal",
        element: <UploadMeal />,
      },
      {
        path: "meal/:id",
        element: <IndividualMeal />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)