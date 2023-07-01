import React,{ useEffect, useState } from "react";
// import { getAllPost } from "../../api/methods/get";
import { Link } from "react-router-dom";
import { getPosts } from "../../../utils/methods/get";
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
  // useEffect(() => {
  //   getAllPost()
  //     .then((res: any) => {
  //       console.log(res.data);
  //       setPosts(res.data);
  //     })
  //     .catch((err: Error) => {
  //       console.log(err);
  //     });
  // }, []);
  // const getAllPost = async () => {
  //   return await getPosts();
  // };

  return (
    <div className="overflow-auto max-h-screen">
      <div className="container p-5 overflow-auto max-h-between mt-4 flex flex-row">
        <div className="min-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md border-2 ">
          <div className="flex items-center">
            <img
              src="https://stackdiary.com/140x100.png"
              alt="Author"
              className="hidden object-cover w-10 h-10 rounded-full sm:block"
            />
            <div className="flex flex-col text-left ml-5">
              <Link to={"/"} className="font-bold text-gray-700 cursor-pointer">
                MERN Stack Developer
              </Link>
              <span className="text-sm font-light text-gray-200 dark:text-gray-900">
                12-10-22
              </span>
            </div>
          </div>

          <div className="mt-2">
            <p className="mt-5 text-gray-600 text-left max-w-sm  mb-10">
              Looking for skilled mern stack developer Looking for skilled mern stack developer Looking for skilled mern stack developer
            </p>
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div className="flex items-center justify-between mt-4">
            
            <button className="px-4 rounded text-white bg-sky-400 hover:bg-sky-500">
              View
            </button>
          </div>
        </div>
        <div className="min-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md border-2">
          <div className="flex items-center">
            <img
              src="https://stackdiary.com/140x100.png"
              alt="Author"
              className="hidden object-cover w-10 h-10 rounded-full sm:block"
            />
            <div className="flex flex-col text-left ml-5">
              <Link to={"/"} className="font-bold text-gray-700 cursor-pointer">
                MERN Stack Developer
              </Link>
              <span className="text-sm font-light text-gray-200 dark:text-gray-900">
                12-10-22
              </span>
            </div>
          </div>

          <div className="mt-2">
            <p className="mt-5 text-gray-600 text-left max-w-sm  mb-10">
              Looking for skilled mern stack developer Looking for skilled mern stack developer Looking for skilled mern stack developer
            </p>
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div className="flex items-center justify-between mt-4">
            
            <button className="px-4 rounded text-white bg-sky-400 hover:bg-sky-500">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
