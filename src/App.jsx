import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import NewsFeed from './Pages/NewsFeed/NewsFeed';
import UserPosts from './Pages/UserPosts/UserPosts';
import NotFound from './Pages/NotFound/NotFound';
import AppPR from './Components/ProtectedRouts/AppPR';
import AuthPR from './Components/ProtectedRouts/AuthPR';
import PostDetails from './Pages/PostDetails/PostDetails';
import SavedPosts from './Pages/SavedPosts/SavedPosts';
import Profile from './Pages/Profile/Profile';
function App() {
  const routes = createBrowserRouter([
  {path: "/", element: <AuthLayout />, children: [
     {path: "register", element: <AuthPR><Register/></AuthPR>},
     {path: "login", element: <AuthPR><Login/></AuthPR>},
   
  ]},
  {path: "/", element: <MainLayout />, children: [
    {index : true, element: <AppPR><NewsFeed/></AppPR>},
    {path: "post-details/:postId", element: <AppPR><PostDetails/></AppPR>},
    {path: "myPosts", element: <AppPR><UserPosts/></AppPR>},
    {path: "savedPosts", element: <AppPR><SavedPosts/></AppPR>},
    {path: "profile", element: <AppPR><Profile/></AppPR>},
    {path: "*", element: <AppPR><NotFound/></AppPR>}
  ]},
]);

  return (
    <>
    <RouterProvider router = {routes} ></RouterProvider>
    </>
  )
}

export default App;