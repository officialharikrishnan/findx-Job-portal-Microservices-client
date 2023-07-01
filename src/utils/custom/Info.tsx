import React from "react";

const Info = ({color,textColor,border,message}:any) => {
  return (
    <div>
      <div
        className={`bg-blue-100 border-t border-b ${color} ${border} ${textColor} px-4 py-3`}
        role="alert"
      >
        <p className="font-bold">Message</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Info;
