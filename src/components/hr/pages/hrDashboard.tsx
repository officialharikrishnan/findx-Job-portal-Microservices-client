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
          <Search />
          <Jobs />
          <div className="sticky bottom-10 flex justify-end">
            <Link to={"/hr/create-post"}><button data-tooltip-target="tooltip-default" className="inline-flex items-center justify-center w-14 h-14 mr-2 text-indigo-100 transition-colors duration-150 bg-sky-700 rounded-lg focus:shadow-outline hover:bg-sky-800">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
