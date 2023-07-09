import React, { useEffect, useReducer, useState } from "react";
import { UPDATE_PROFILE } from "../../../utils/methods/post";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface Store {
  userProfile: {
    user: {};
  };
}
type Data = {
  profile?:{
    title?:string,
    bio?:string,
    address?:string,
    skills?:string,
    experience?:[],
  }
};

const UpdateProfile = () => {
  const [experience, setExperience] = useState<any>([]);
  const [profile,setProfile]=useState<any>()
  const [tempExp, setTempExp] = useState("");
  const [expAdd, setExpAdd] = useState(false);
  const [tempExpCompany, setTempExpCompany] = useState("");
  const [tempExpRole, setTempExpRole] = useState("");
  const [updated,setUpdated]=useState(false)
  const [updateErr,setUpdateErr]=useState(false)
  const navigate=useNavigate()
  const data: Data = useSelector((store: Store) => store.userProfile.user);
   
  useEffect(()=>{
    setProfile(data.profile)
    console.log(">>>>>>/////>>>>",data.profile)
    if(data.profile?.experience){
      setExperience(data.profile?.experience)
    }
 
  },[])
  let initialState:any = null
  if(data.profile){
    initialState =  { ...data.profile}
  }else{
    initialState = {
      title:'',
      bio:'',
      skills:'',
      experience:[],
      image:"",
      cv:"",
      address:''
    }
  }
  const [formState,dispatch]=useReducer(formReducer,initialState)
  function formReducer(state:any,action:any){ 
    switch (action.type){
      case 'insert':{
        return {
          ...state,
          [action.field]:action.payload
        }
      }
      case 'insert-file':{
        return {
          ...state,
          [action.field]:action.payload
        }
      }
      case 'exp':{
        return {
          ...state,
          [action.field]:experience
        }
      }
    }

  }
  console.log(">>>>",formState)
  const handleChange = (e:any)=>{
    e.preventDefault();
    dispatch({
      type:'insert',
      field:e.target.name,
      payload:e.target.value
  })
  }
  const handleChangeFile = (e:any)=>{
    e.preventDefault();
    dispatch({
      type:'insert-file',
      field:e.target.name,
      payload:e.target.files[0]
  })
  }
  const formSubmit = async (e: any) => {
    e.preventDefault();

    const formdata = new FormData()
    
    formdata.append('data',JSON.stringify(formState))
    formdata.append('image',formState.image)
    formdata.append('cv',formState.cv)
    const res = await UPDATE_PROFILE(formdata);
    console.log(res,">>>>>res")
    if(res?.status === 200){
      setUpdated(true)
      navigate('/user/view-profile')
    }else{
      setUpdateErr(true)
    }
    // console.log("form>>", res);
  };
  const experienceHandler = () => {
    console.log(experience,">>>>>>>>>>>>befor>")
  
    setExpAdd(true);
    setExperience( [...experience, { tempExpCompany, tempExpRole, tempExp }]);
    setTempExp("");
    setTempExpCompany("");
    setTempExpRole("");
    dispatch({
      type:'exp',
      field:'experience',
      payload:experience
    })
    console.log(experience,">>>>>>>>>>>>after>")
  };
  const removeExp = (index: any) => {
    setExperience([
      ...experience.filter((item: any, ind: any) => index !== ind),
    ]);
    dispatch({
      type:'exp',
      field:'experience',
      payload:experience
    })
  };
  return (
    <div>
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
                    <p>Title</p>
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder={profile ? profile.title : "Title"}
                      name="title"
                      onChange={e=>handleChange(e)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className=" relative ">
                    <p>Bio</p>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-5 block p-2.5 w-full rounded appearance-none border  py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder={profile ? profile.bio : "Write your bio..."}
                      name="bio"
                      onChange={e=>handleChange(e)}
                    ></textarea>
                  </div>
                  <div className=" relative ">
                    <p>Address</p>
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder={profile ? profile.address : "Address"}
                      name="address"
                      onChange={e=>handleChange(e)}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <p>Skills</p>
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder={profile ? profile.skills : "Skills"}
                      name="skills"
                      onChange={e=>handleChange(e)}
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
                          <span className="font-semibold">Click to upload Profile Photo</span>
                          {formState.image.name}
                        </p>
                        
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={e=>handleChangeFile(e)}

                      />
                    </label>
                  </div>
                </div>
                {expAdd && (
                  <div className="w-full border-2 h-24 overflow-scroll">
                    {experience &&
                      experience.map((item: any, index: any) => {
                        return (
                          <div className="bg-sky-100 m-2 border-2 flex flex-row justify-evenly text-gray-600 ">
                            <p>{item.tempExpCompany}</p>
                            <p>{item.tempExpRole}</p>
                            <p>{item.tempExp}</p>
                            <p
                              className="text-red-400"
                              onClick={(e) => removeExp(index)}
                            >
                              x
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className="flex flex-col mb-2 border-2 p-2">
                  <p>Experience</p>
                  <div className=" relative flex justify-center flex-wrap">
                    
                    <div>
                      <input
                        type="text"
                        className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Company Name"
                        value={tempExpCompany}
                        onChange={(e) => setTempExpCompany(e.target.value)}
                      />
                      <input
                        type="text"
                        className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Role"
                        value={tempExpRole}
                        onChange={(e) => setTempExpRole(e.target.value)}
                      />
                      <input
                        type="text"
                        className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Experience"
                        value={tempExp}
                        onChange={(e) => setTempExp(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={experienceHandler}
                      className="bg-sky-300 rounded p-2 mt-2"
                      type="button"
                    >
                      Add
                    </button>
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
                          <span className="font-semibold">Click to upload CV </span>
                          {formState.cv.name}
                        </p>
                        
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="cv"
                        onChange={e=>handleChangeFile(e)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex w-full my-4">
                  <button
                    onClick={(e) => formSubmit(e)}
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Update
                  </button>
                  
                </div>
              </form>
              {updated && <div
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
                <div>
                   Profile Successfully updated
                </div>
              </div> }{updateErr && <div
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
                <div>
                   Something went wrong please try again later
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
