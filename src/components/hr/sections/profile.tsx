import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile_hr } from "../../../utils/methods/get";
import { insertHr } from "../../../store/hrSlice";
import { Link, useNavigate } from "react-router-dom";
import ProfileShimmer from "../../shimmer/profileCard";

type Data = {
  hr?:{

    firstName?: string;
    companyName?: string;
  },
  profileUrl?:""
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hrData,setHrData]=useState<Data>()

  useEffect(() => {
    getUser();

  }, []);
  const getUser = async () => {
    try {
      const data = await getProfile_hr();
      if (data?.status !== 200) {
        navigate("/hr/login");
      } else {
        dispatch(insertHr(data?.data));
        setHrData(data.data)

      }
    } catch (e) {
      navigate("/hr/login");
    }
  };
  // }
  console.log("hoem>>>>", hrData);
  return (
    <div className="sticky top-0">
       <div className="w-[310px] pb-5 mx-auto mt-4 overflow-hidden rounded-lg shadow-lg">
        <div className="h-40 bg-gradient-to-br from-sky-200 via-sky-500 to-sky-900">
          <div className="flex justify-center">
            <span className="mt-10 text-4xl font-extrabold text-white">
              {hrData?.hr && hrData.hr.firstName}
            </span>
          </div>
          <div className="flex justify-center">
            <img
              className="object-cover w-24 h-24 mt-4 border-4 border-gray-200 rounded-full"
              src={hrData && hrData.profileUrl}
              alt=""
            />
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-center mt-10 mb-4 text-xl font-medium">
            {hrData?.hr && hrData.hr.companyName}
          </div>
          

          

          
        </div>
        <div className="flex justify-center mt-2">
         <Link to={"/hr/view-profile"}> <button
            type="button"
            className="inline-flex items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-sky-600 border border-transparent rounded-md hover:bg-sky-500 focus:outline-none focus:border-sky-700 focus:shadow-outline-indigo active:bg-sky-700"
          >
            View Profile
          </button>
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
