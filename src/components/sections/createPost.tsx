import React, { useState } from "react";
import { CREATE_POST } from "../../utils/methods/post";
import axios from "axios";

const CreatePost = () => {
    const [text,setText]=useState('')
    const [image,setImage]=useState<{ preview: string; data: File | null }>({ preview: '', data: null })
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    }
    
    const imageHandle = (e:any) => {
        const file = e.target.files && e.target.files[0];

    if (file) {
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setImage(img);
    }
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault()
       
        let formData = new FormData()
        formData.append('file', image.data!)
        formData.append('data', text)
        const res = await axios.post('http://findx.com/api/post/create',formData)
        console.log(res)
    }
    console.log(image,">>>",text)
  return (
    <div className="container">
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
      <div className=" editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded">
      
        <textarea
          className="description bg-gray-100 sec p-3 h-20 border border-gray-300 outline-none"
          placeholder="Write somthing"
          value={text}
          onChange={(e)=>{setText(e.target.value)}}
        ></textarea>

        <div className="icons flex justify-end text-gray-500 m-2">
            <div className="w-10">
                <img src={image.preview} alt="" />
            </div>
          <label htmlFor="file-input">
          <svg
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          </label>
          <input type="file" id="file-input" name="file" onChange={imageHandle} hidden />
          
        <div className="buttons flex">
          <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-sky-500 rounded">
            Post
          </button>
        </div>
        </div>

      </div>
      </form>
    </div>
  );
};

export default CreatePost;
