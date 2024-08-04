import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import HomePage from "../pages/home/HomePage";
import HallPage from "../pages/hall/HallPage";
import MsgPage from "../pages/message/MsgPage";
import LoginPage from "../pages/login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainPage,
    children: [
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "hall",
        Component: HallPage,
      },
      {
        path: "message",
        Component: MsgPage,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
]);

export default router;
