import React, { useEffect, useState } from "react";
// import { getAllPost } from "../../api/methods/get";
import { Link } from "react-router-dom";
import { getAllJobs, getPosts } from "../../../utils/methods/get";
// import CreatePost from "./createPost";
type Post = {
  data?: string;
  dateString?: string;
  image?: string;
  user?: any;
  likes?: number;
  comments: Array<object>;
};
function Post() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(["", "", "", "", "", "", "", "", "", ""]);
  useEffect(() => {
    getJobs()
  }, []);
  const getJobs = async ()=>{
      const res =await getAllJobs()
      console.log(res,"jobs")
  }

  return (
    <div className="overflow-auto max-h-screen">
      <div className="flex flex-wrap justify-center">
        {count &&
          count.map(() => {
            return (
              <div className="p-4 max-w-sm">
                <div className="flex rounded-lg h-full bg-sky-400 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                      <img
                        src="https://ibsintelligence.com/wp-content/uploads/2021/09/TCS.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <h2 className="text-white text-lg font-medium">
                        MERN Stack developr
                      </h2>
                      <p className="text-gray-500 text-lg">Tata Consultancy Services</p>
                      <p className="text-gray-500 text-md">Kochi</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="leading-relaxed text-left text-white">
                      The candidate should have a strong knowledge of Node,
                      React, and MongoDB. Responsibilities: Design and develop
                      high-performance web applications using the MERN stack.
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
}

export default Post;
