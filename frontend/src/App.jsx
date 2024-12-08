import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import  Home  from './components/Home'
import  Jobs  from './components/Jobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>

  },
  {
    path: '/login',
    element: <Login/>

  },
  {
    path: '/signup',
    element: <Signup/>

  },
  {
    path: '/job',
    element: <Jobs/>

  },
  {
    path: '/profile',
    element: <Profile/>

  },
  {
    path: '/description/:id',
    element: <JobDescription/>

  }

])
function App() {
  

  return (
    <div>
     
     <RouterProvider router = {appRouter} />
      
    </div>
  )
}

export default App
