import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authVerify } from "../store/slice/checkAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Register from "../pages/Register";
import UserLogin from "../pages/Login";
import ProfilePage from "../pages/Profile";
import EditProfile from "../pages/Edit";
import SkillConnect from "../pages/SkillConnect";
import Connections from "../pages/Connections";
import Session from "../pages/Session";
import ChatsPage from "../pages/chats";
import LeaderboardPage from "../pages/leaderboard";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import App from "../pages/App";

const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Layout />,
    children: [
      { index : true, element: <App /> },
      {path : '/home', element: <Home />},
      {path : '/register', element: <Register />},
      {path : '/login', element: <UserLogin />},
      {path: '/profile', element: <ProfilePage />}, 
      {path: '/edit', element: <EditProfile />},
      {path: '/skillConnect', element: <SkillConnect />},
      {path: '/connections', element: <Connections />},
      {path: '/session', element: <Session />},
      {path: '/chats', element: <ChatsPage />},
      {path: '/leaderboard', element: <LeaderboardPage />},
    ],
  }
]);

function RootWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authVerify());
  }, [dispatch]);

  return <RouterProvider router={router}/>;
}

export default RootWrapper;