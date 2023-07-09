import React, { useEffect, useState } from "react";
import Header from "../sections/header";
import { useDispatch, useSelector } from "react-redux";
import { getProfile_hr } from "../../../utils/methods/get";
import { insertHr } from "../../../store/hrSlice";
import { HR_UPDATE_PROFILE } from "../../../utils/methods/patch";
import { useNavigate } from "react-router-dom";
interface Store {
  hr: {
    hr: {};
  };
}
type Data = {
  hr?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyName?: string;
  };
  profile?: "";
};

const UpdateProfile = () => {
  const profileData: Data = useSelector((store: Store) => store.hr.hr);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [image, setImage] = useState<any>([]);
  const [updated, setUpdated] = useState(false);
  const [updateErr, setUpdateErr] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
      getProfile();
  }, []);
  const getProfile = async () => {
    const response = await getProfile_hr();
    console.log(response);
    if (response?.status === 200) {
      dispatch(insertHr(response.data));
      setFirstName(response.data.hr.firstName);
      setLastName(response.data.hr.lastName);
      setCompanyName(response.data.hr.companyName);
    }
  };
  console.log(firstName, lastName, companyName, ">>>");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      companyName,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", image[0]);
    const res = await HR_UPDATE_PROFILE(formData);
    console.log(res, ">>>>>>>>");
    if (res?.status === 200) {
      setUpdated(true);
      setUpdateErr(false);
      getProfile();
      setTimeout(() => {
        navigate("/hr/view-profile");
      }, 2000);
    } else {
      setUpdated(false);
      setUpdateErr(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 ">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col ">
            <div className="self-center text-xl font-light text-gray-800 sm:text-2xl ">
              Update Profile
            </div>

            <div className="mt-20">
              <form encType="multipart/form-data">
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <p>FirstName</p>
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      //   placeholder={profile ? profile.title : "Title"}
                      name="firstName"
                      placeholder={profileData?.hr && profileData.hr?.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className=" relative ">
                    <p>Last Name</p>
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      //   placeholder={profile ? profile.address : "Address"}
                      name="lastName"
                      placeholder={profileData?.hr && profileData.hr?.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className=" relative ">
                    <p>Company Name</p>
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      //   placeholder={profile ? profile.address : "Address"}
                      name="companyName"
                      placeholder={
                        profileData?.hr && profileData.hr?.companyName
                      }
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Click to upload Profile Photo
                          </span>
                          {image && image[0]?.name}
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={(e) => setImage(e.target.files)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex w-full my-4">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Update
                  </button>
                </div>
              </form>
              {updated && (
                <div
                  className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>Profile Successfully updated</div>
                </div>
              )}
              {updateErr && (
                <div
                  className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Error</span>
                  <div>Something went wrong please try again later</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
