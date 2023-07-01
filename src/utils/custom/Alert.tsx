import React, { useState } from "react";
import { Link } from "react-router-dom";

const Alert = ({ color,border, message, redirect , redirectText}: any) => {
  return (
    <>
      <div
        className={`${color} border-l-4 ${border} text-gray-800 p-4 mt-5`}
        role="alert"
      >
        <p className="font-bold">Alert</p>
        <div className="flex flex-row flex-wrap space-x-1">
        <p>{message}</p>
        {redirect && <Link to={`/${redirect}`}><p className="underline">{redirectText}</p></Link>}
        </div>
      </div>
    </>
  );
};

export default Alert;
