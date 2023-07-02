import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../sections/header";
import Profile from "../sections/profile";
import Jobs from "../sections/jobs";
import { useMediaQuery } from "react-responsive";
import Search from "../sections/search";

const HrDashboard = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return (
    <div>
      <Header />
      <div className="container flex flex-row lg:p-10">
        {isBigScreen && (
          <div className="grid-cols-1 invisible lg:visible ">
            <Profile />
          </div>
        )}
        <div className="grid-cols-11">
          <div className="text-center text-3xl font-bold text-gray-500">
            <h1>My Jobs</h1>
          </div>
          <Search/>
          <Jobs />
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
