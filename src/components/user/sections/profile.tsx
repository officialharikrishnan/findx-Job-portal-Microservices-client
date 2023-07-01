import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../utils/methods/get";
import axios from "axios";
import { insert } from "../../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
interface Store{
  user:{
    user:{}
  }
}
type Data = {
  firstName?:string
  email?:string
  phone?:any
}

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data:Data = useSelector(((store:Store) => store.user.user))

    useEffect( ()=>{
      getUser()
    },[])
    const getUser = async ()=>{
      const data = await  getProfile()
      console.log(data)
      if(data?.status !== 200){
        navigate('/user/login')
      }else{
        dispatch(insert(data?.data))
      }

    }
  // }
  console.log("hoem>>>>",data)
  return (
    <div>
      <div className="max-w-sm pb-5 mx-auto mt-4 overflow-hidden rounded-lg shadow-lg">
        <div className="h-40 bg-gradient-to-br from-sky-200 via-sky-500 to-sky-900">
          <div className="flex justify-center">
            <span className="mt-10 text-4xl font-extrabold text-white">
              {data && data.firstName}
            </span>
          </div>
          <div className="flex justify-center">
            <img
              className="object-cover w-24 h-24 mt-4 border-4 border-gray-200 rounded-full"
              src="https://im.indiatimes.in/content/2019/Jun/marvel_fans_start_a_petition_to_demand_robert_downey_jr_aka_tony_stark_aka_iron_man_back_1559715390_725x725.jpg"
                alt=""
            />
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-center mt-10 mb-4 text-xl font-medium">
            {data && data.email}
          </div>
          

          

          <div className="flex text-gray-600">
            <svg
              className="h-5 mt-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{data && data.phone}</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Link to={"/user/view-profile"}><button
            type="button"
            className="inline-flex items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
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
