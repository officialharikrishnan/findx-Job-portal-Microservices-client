import React from "react";
import { Link } from "react-router-dom";
import Profile from "../sections/profile";
import Post from "../sections/Post";
import { useMediaQuery } from 'react-responsive'
import Search from "../sections/search";
const HomePage = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1224px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  return (
    <div className="container flex flex-row lg:p-10">
      {isBigScreen && <div className="grid-cols-1 invisible lg:visible ">
        <Profile />
      </div>}
      <div className=" grid-cols-11">
        <Search/>
      <div className="text-center text-2xl font-bold text-gray-500">
            <h1>Recommmeded</h1>
          </div>
        <Post />
      </div>
    </div>
  );
};

export default HomePage;
