import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../utils/methods/get";
import { Link, useNavigate } from "react-router-dom";
import { insert } from "../../../store/userSlice";
interface Store {
  user: {
    user: {};
  };
}
type Data = {
  firstName?: string;
  lastName?:string
  email?: string;
  phone?: any;
};

const ViewProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const data: Data = useSelector((store: Store) => store.user.user);
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
    console.log(data)
  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                <p className="text-gray-400">Applied</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                <p className="text-gray-400">Saved</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <Link to={"/user/update-profile"}><button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Update Profile
              </button>
              </Link>
              
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            <div>

            <h1 className="text-4xl font-medium text-gray-700">
              {data && data.firstName} &nbsp;{data && data.lastName}
              <span className="font-light text-gray-700"></span>
            </h1>
            </div>
            <p className="font-light text-gray-600 mt-3">{data && data.email}</p>{" "}
            <p className="mt-8 text-gray-500">
              Solution Manager - Creative Tim Officer
            </p>{" "}
            <p className="mt-2 text-gray-500">University of Computer Science</p>{" "}
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <p className="text-gray-600 text-center font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>{" "}
            <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              {" "}
              Show more
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
