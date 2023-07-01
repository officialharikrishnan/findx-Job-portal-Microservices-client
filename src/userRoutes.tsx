import React from "react";
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from "react-router-dom";
import ViewProfile from "./components/user/pages/viewProfile";
import Login from "./components/user/pages/userLogin";
import Register from "./components/user/pages/register";
import App from "./App";
import Otp from "./components/user/pages/otp";
import ProfileComplete from "./components/user/pages/profileComplete";
import UpdatePassword from "./components/user/pages/updatePassword";
import UpdateProfile from "./components/user/pages/updateProfile";

const UserRoutes = () => {



  return <>

    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<App/>}/>
        <Route path="/verify" element={<Otp/>}/>
        <Route path="/details" element={<ProfileComplete/>}/>
        <Route path="/forgot" element={<UpdatePassword/>}/>
        <Route path="/view-profile" element={<ViewProfile/>}/>
        <Route path="/update-profile" element={<UpdateProfile/>}/>
    </Routes>
  </>
};

export default UserRoutes;
