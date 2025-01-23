import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Signup/Login'
import Home from './pages/Home/Home'
import { useSelector } from 'react-redux'
import AdminSignup from './AdminPage/AdminSignup'
import AdminLogin from './AdminPage/AdminLogin'
import AdminHome from './AdminPage/AdminHome'



function App() {

  const loginData = useSelector((state) => state.userLogin?.LoginInfo[0])
  const adminLogin = useSelector((state) => state.adminLogin?.adminInfo[0])
  const Token = loginData?.Token
  console.log(Token);
  

  const app = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/',
      element: Token ? <Home /> : <Login />
    },

    // Admin routes
    {
      path: '/admin',
      element: <AdminSignup />
    },
    {
      path: '/adminLogin',
      element: <AdminLogin />
    },
    {
      path: '/adminHome',
      element: adminLogin ? <AdminHome /> : <AdminLogin />
    }
  ])

  return (
    <>
      <RouterProvider router={app} />
    </>
  )
}

export default App
