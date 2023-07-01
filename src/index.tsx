import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./components/user/pages/landingPage";
import { Suspense } from "react";


const User = React.lazy(()=> import('./userRoutes'))
const Hr = React.lazy(()=> import('./hrRoutes'))


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/user/*" element={<Suspense><User/></Suspense>}/>
      <Route path="/hr/*" element={<Suspense><Hr/></Suspense>}/>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  
);
