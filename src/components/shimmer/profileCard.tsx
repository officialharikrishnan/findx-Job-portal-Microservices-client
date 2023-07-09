import React from "react";

const ProfileShimmer = () => {
  return (
    <div>
      <div className="flex flex-col rounded shadow-md w-full sm:w-80 animate-pulse h-full">
        <div className="h-60 rounded-t dark:bg-gray-200"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-400">
          <div className="w-full h-6 rounded dark:bg-gray-400"></div>
          <div className="w-full h-6 rounded dark:bg-gray-400"></div>
          <div className="w-3/4 h-6 rounded dark:bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
