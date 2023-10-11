import "./App.css"
import React from 'react'
import Switcher from "./components/darkMode/Switcher"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import Profile from "./pages/profile/Profile"
import Explore from "./pages/explore/explore"
import Reels from "./pages/reels/Reels"
import Login from "./pages/login/Login"
import Registration from "./pages/registration/Registration"
import AccountEdit from "./pages/accountEdit/AccountEdit"
import Sozdat from "./pages/Sozdat/Sozdat"
import UserProfile from "./pages/userProfile/UserProfile"
import Direct from "./pages/direct/Direct"
// import Login2 from "./pages/login2/Login2"

const App = () => {
  const routerX = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/basic',
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: 'search',
          element: <Search/>
        },
        {
          path: 'explore',
          element: <Explore/>
        },
        {
          path: 'reels',
          element: <Reels/>
        },
        {
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'accountEdit',
          element: <AccountEdit/>
        },
        {
          path: 'Sozdat',
          element: <Sozdat/>
        },
        {
          path: 'userProfile/:id',
          element: <UserProfile/>
        },
        {
          path: 'direct',
          element: <Direct/>
        }
      ]
    },
    {
      path: '*',
      element: ""
    },
    {
      path: '/registration',
      element: <Registration/>
    },
  ])
  return (<RouterProvider router={routerX}/>)
}

export default App
