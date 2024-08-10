import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import HallPage from "../pages/hall/HallPage";
import CyclePage from "../pages/hall/CyclePage";
import PostPage from "../pages/hall/PostPage";
import NewPostPage from "../pages/hall/NewPostPage";
import MsgPage from "../pages/message/MsgPage";
import LoginPage from "../pages/login/LoginPage";
import LikePage from "../pages/home/LikePage";
import ProfilePage from "../pages/home/ProfilePage";
import CenterPage from "../pages/home/CenterPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainPage,
    children: [
      {
        path: "/",
        element: <Navigate to="home/mycenter" replace />,
      },
      {
        path: "home",
        children: [
          {
            path: "likes",
            Component: LikePage,
          },
          {
            path: "profile",
            Component: ProfilePage,
          },
          {
            path: "mycenter",
            Component: CenterPage,
          },
        ],
      },
      {
        path: "hall",
        Component: HallPage,
      },
      {
        path: "message",
        Component: MsgPage,
      },
      {
        path: "hall/cycle/:cycleID",
        Component: CyclePage,
      },
      {
        path: "hall/cycle/:cycleID/:postID",
        Component: PostPage,
      },
      {
        path: "hall/cycle/:cycleID/new",
        Component: NewPostPage,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
]);

export default router;
