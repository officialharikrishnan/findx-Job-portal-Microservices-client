import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../../utils/methods/get";
interface Job{
  title?:string,
  description?:string,
  location?:string,
  companyName?:string,
  logo?:string
}
const Jobs = () => {
  const [count, setCount] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [jobs,setJobs]=useState([])

  useEffect(() => {
    getJobs()
  }, []);
  const getJobs = async ()=>{
      const res =await getAllJobs()
      if(res?.status === 200){
        setJobs(res?.data)
      }
      console.log(res,"??????")
    }
    console.log(jobs,"////////")

  return (
    <div className="overflow-auto max-h-screen">
    <div className="flex flex-wrap justify-center">
      {jobs &&
        jobs.map((job:Job) => {
          return (
            <div className="p-4 w-80">
              <div className="flex rounded-lg h-full bg-sky-400 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <img
                      src={job.logo}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <h2 className="text-white text-lg font-medium">
                      {job.title}
                    </h2>
                    <p className="text-gray-500 text-lg">{job.companyName}</p>
                    <p className="text-gray-500 text-md">{job.location}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <p className="leading-relaxed text-left text-white">
                    {job.description}
                  </p>
                  <Link
                    to={"/user/home"}
                    className="mt-3 text-black hover:text-blue-600 inline-flex items-center"
                  >
                    View
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    
  </div>
  );
};

export default Jobs;
