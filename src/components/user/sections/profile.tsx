import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getUserProfile } from "../../../utils/methods/get";
import axios from "axios";
import { insert } from "../../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
interface Store {
  user: {
    user: {};
  };
}
type Data = {
  firstName?: string;
  email?: string;
  phone?: any;
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData,setUserData]=useState<any>({})
  const data: Data = useSelector((store: Store) => store.user.user);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const data = await getProfile();
    const profile = await  getUserProfile()
    console.log(data);
    if (data?.status !== 200) {
      navigate("/user/login");
    } else {
      dispatch(insert(data?.data));
      setUserData(profile?.data)
    }
  };
  // }
  console.log("hoem>>>>", userData);
  return (
    <div className="sticky top-0">
      <div className="w-[500px] max-w-sm bg-white border  rounded-lg shadow-lg dark:bg-white ">
        <div className="flex justify-end px-4 pt-4">
         
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userData && userData.profileUrl}
            alt=""
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {data && data.firstName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.profile && userData.profile.title}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            
            <Link
              to={"/user/view-profile"}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
