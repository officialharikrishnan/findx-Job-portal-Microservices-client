import React, { useState } from "react";
import { CREATE_POST, JOB_CREATE } from "../../../utils/methods/post";
import axios from "axios";
import Status from "../../../utils/custom/status";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [requirements, setRequirments] = useState<any>([]);
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [companyName,setCompanyName]=useState('')
  const [vacancies,setVacancies]=useState('')
  const [type,setType]=useState('')
  const [location,setLocation]=useState('')
  const [experience,setExperience]=useState('')
  const [education,setEducation]=useState('')
  const [website,setWebsite]=useState('')
  const [logo,setLogo]=useState<any>('')
  const [updated,setUpdated]=useState(false)
  const [updateErr,setUpdateErr]=useState(false)
  const navigate=useNavigate()
  const setRequirmentsHandler = (e: any) => {
    e.preventDefault();
    setRequirments([...requirements, text]);
  };

  console.log(type);

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    let image=logo[0]
    const formData = new FormData()
    formData.append('title',title)
    formData.append('description',description)
    formData.append('companyName',companyName)
    formData.append('vacancies',vacancies)
    formData.append('type',type)
    formData.append('location',location)
    formData.append('experience',experience)
    formData.append('education',education)
    formData.append('website',website)
    formData.append('logo',image)
    console.log(formData)

    const res = await JOB_CREATE(formData)
    if(res?.status === 200){
      setUpdated(true)
      setUpdateErr(false)
      setTimeout(()=>{
        navigate('/hr/dashboard')
      },2000)
    }else{
      setUpdated(false)
      setUpdateErr(true)
    }
  }

  return (
    <div className="container">
      <section className="max-w-4xl p-6 mx-auto  rounded-md bg-white shadow-xl mt-20">
        <h1 className="text-xl font-bold capitalize">Add Job</h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className=" ">Title</label>
              <input
                id="title"
                onChange={e=>setTitle(e.target.value)}
                type="text"
                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md   dark:border-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className=" ">Description</label>
              <input
                id="description"
                type="text"
                onChange={e=>setDescription(e.target.value)}
                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md   dark:border-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className=" ">Company Name</label>
              <input
                id="companyName"
                type="text"
                onChange={e=>setCompanyName(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className=" "> Vacancies</label>
              <input
                id="vacancies"
                type="number"
                onChange={e=>setVacancies(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className=" ">Type</label>
              <select onChange={e=>setType(e.target.value)}  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md    focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option>Onsite</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <div className="w-full max-h-24 bg-slate-100 rounded flex flex-row flex-wrap overflow-scroll">
                {requirements &&
                  requirements.map((item: string) => {
                    return (
                      <p className="bg-gray-200 border border-gray-400 p-1 m-1">
                        {item}
                      </p>
                    );
                  })}{" "}
              </div>
              <label className=" ">Requirements</label>
              <input
                id=""
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="block w-full py-2 mt-2 bg-white border border-gray-300 rounded-md  dark:border-gray-300 focus:outline-none focus:ring"
              />
              <button
                className="bg-gray-300 p-2 mt-1 rounded"
                onClick={(e) => setRequirmentsHandler(e)}
              >
                Add
              </button>
            </div>
            <div>
              <label className=" ">Location</label>
              <input
                id="date"
                type="text"
                onChange={e=>setLocation(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className=" ">Experience</label>
              <input
                id="date"
                type="text"
                onChange={e=>setExperience(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className=" ">Education</label>
              <input
                id="date"
                type="text"
                onChange={e=>setEducation(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className=" ">Website</label>
              <input
                id="date"
                type="text"
                onChange={e=>setWebsite(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <button className="bg-gray-300 p-2 mt-1 rounded">Add Exam</button>
            </div>
            <div>
              <label className="block text-sm font-medium ">Logo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 "
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={e=>setLogo(e.target.files)}
                      />
                    </label>
                  </div>
                      <p>{logo && logo[0].name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button onClick={e=>handleSubmit(e)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
        <div className="mt-2">

        {updateErr && <Status title="Error" message="Job not uploaded, somthing went wrong" err={true}/>}
        {updated && <Status title="Success" message="Job created successfully" err={false}/>}
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
