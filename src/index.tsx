import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/user/pages/userLogin";
import Register from "./components/user/pages/register";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./components/user/pages/landingPage";
import ProfileComplete from "./components/user/pages/profileComplete";
import HrLogin from "./components/hr/pages/hrLogin";
import HrRegister from "./components/hr/pages/hrRegister";
const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element:<App/>,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path:'/details',
    element:<ProfileComplete/>
  },
  {
    path:"hr-login",
    element:<HrLogin/>
  },
  {
    path:'hr-register',
    element:<HrRegister/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
    </Provider>
  
);
