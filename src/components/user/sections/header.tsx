import React, { useState } from "react";
import { cookieHandler } from "../../../utils/cookie/cookieHandler";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const {removeCookie}  = cookieHandler()
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  async function logoutHandler(e:any){
    await removeCookie('findx').then(()=>{
      navigate('/user/login')
    }).catch(()=>{
      console.log("cookie not cleared")
    })
  }
  return (
    <div>
      <header className="w-full bg-sky-500 text-gray-100 body-font mb-4 shadow-sm">
        {/* :DESKTOP MENU */}
        <div className="container mx-auto flex justify-between items-center py-7 px-5">
          {/* Site logo and Name */}
          <a
            href="#link"
            className="flex flex-shrink-0 title-font font-medium items-center text-sky-500 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white p-2 bg-gradient-to-br from-sky-900 to-sky-300 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span className="ml-3 text-xl text-gray-100 font-semibold antialiased">
              FindX
            </span>
          </a>
          {/* Navbar */}
          <nav className="hidden md:ml-auto md:flex flex-wrap items-center justify-center text-base tracking-wide">
            <a href="#link" className="mr-8 hover:text-gray-300">
              Home
            </a>
            <a href="#link" className="mr-8 hover:text-gray-300">
              Jobs
            </a>
            <Link to={"/user/view-profile"} className="mr-8 hover:text-gray-300">
            Profile
            </Link>
            <button onClick={e=>logoutHandler(e)} className="mr-8 hover:text-gray-300">
              logout
            </button>
          </nav>
          
          {/* Burger icon standard */}
          <button
            className="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-md text-gray-300 bg-gradient-to-br from-transparent to-transparent hover:text-white hover:from-blue-500 hover:to-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* :MOBILE MENU */}
        {isOpen && (
          <div className="w-full flex flex-col py-4 px-3 md:hidden bg-gray-900 text-base uppercase text-center font-semibold">
            <a
              href="#link"
              className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="#link"
              className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Jobs
            </a>
            <a
              href="#link"
              className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Profile
            </a>
            <button
              onClick={e=>logoutHandler(e)}
              className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
