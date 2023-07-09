import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getUserProfile } from "../../../utils/methods/get";
import { Link, useNavigate } from "react-router-dom";
import { insert } from "../../../store/userSlice";
import { insertProfile } from "../../../store/userProfile";
import Header from "../sections/header";
interface Store {
  user: {
    user: {};
  };
}
type Data = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const data: Data = useSelector((store: Store) => store.user.user);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const profile = await getUserProfile();
    const data = await getProfile();
    if (profile?.status === 200) {
      setUserData(profile.data);
      dispatch(insertProfile(profile?.data));
    } else {
      console.log("no profile");
    }
    if (data?.status !== 200) {
      navigate("/user/login");
    } else {
      dispatch(insert(data?.data));
    }
  };
  console.log(data);
  return (
    <div>
      <Header />
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                <p className="text-gray-400">Applied</p>{" "}
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                <p className="text-gray-400">Saved</p>{" "}
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {data && (
                  <img
                    className="rounded-full w-full"
                    src={userData.profileUrl}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <Link to={"/user/update-profile"}>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Update
                </button>
              </Link>
              <Link to={"/user/update-profile"}>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  CV
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <div>
              <h1 className="text-4xl font-medium text-gray-700">
                {data && data.firstName} &nbsp;{data && data.lastName}
                <span className="font-light text-gray-700"></span>
              </h1>
            </div>
            <p className="font-light text-gray-600 mt-3">
              Email : {data && data.email}
            </p>{" "}
            <p className="mt-8 text-gray-500">
              {userData.profile && userData.profile.title}
            </p>
            <p className="mt-2 text-gray-500">
              {userData.profile && userData.profile.skills}
            </p>{" "}
          </div>
          <div className="mt-12 flex flex-col justify-center text-center">
            <h1>Bio</h1>
            <p className="text-gray-600 text-center font-light lg:px-16">
              {userData.profile && userData.profile.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
