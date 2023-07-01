import React, { useState } from "react";
import { UPDATE_PROFILE } from "../../../utils/methods/post";

const UpdateProfile = () => {
    const [title,setTitle]=useState("")
    const [bio,setBio]=useState("")
    const [address,setAddress]=useState("")
    const [skills,setSkills]=useState("")
    const [experience,setExperience]=useState("")

    const formSubmit =async (e:any) => {
        e.preventDefault()
        const formData = new FormData();
        console.log("form submit called")
        formData.append('title',title)
        formData.append('bio',bio)
        formData.append('address',address)
        formData.append('skills',skills)
        formData.append('experience',experience)

        const res = await UPDATE_PROFILE(formData)
        console.log("form>>",res)

        
    }

  return (
    <div>
      <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-50 ">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col ">
            <div className="self-center text-xl font-light text-gray-800 sm:text-2xl ">
              Update Profile
            </div>

            <div className="mt-20">
              <form>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Title"
                      onChange={e=>setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className=" relative ">
                    
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-5 block p-2.5 w-full rounded appearance-none border  py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Write your bio..."
                      onChange={e=>setBio(e.target.value)}

                    ></textarea>
                  </div>
                  <div className=" relative ">
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="address"
                      onChange={e=>setAddress(e.target.value)}

                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Skills"
                      onChange={e=>setSkills(e.target.value)}

                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      className="mt-5 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Experience"
                      onChange={e=>setExperience(e.target.value)}

                    />
                  </div>
                </div>

                <div className="flex w-full my-4">
                  <button
                    onClick={e=>formSubmit(e)}
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
