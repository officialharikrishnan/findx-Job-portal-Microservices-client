import { useNavigate } from "react-router-dom";
import { RegisterData, useValidate } from "../../../formValidation/registerViaEmail";
import { GOOGLE_REG_API } from "../../../utils/methods/post";
import { useDispatch, useSelector } from "react-redux";
import { insert } from "../../../store/userSlice";
import Cookies from 'universal-cookie';
import { useState } from "react";
import Alert from "../../../utils/custom/Alert";

const cookies = new Cookies();
interface Store {
    email: {
      email: '';
    };
  }
const ProfileComplete = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [alert,setAlert]=useState(false)
  const data:string = useSelector((store:Store) => store.email.email )
  const {handleSubmit,register,errors} = useValidate()
  const formSubmit =async (data:RegisterData) => {
    try{
      const res =await GOOGLE_REG_API(data)
      console.log(res?.status,">>>>>>>>>>>>");
      if(res?.data.UserExist === false){
        dispatch(insert(res.data.user))
        cookies.set('findx',res.data.token, { path: '/' })
        navigate("/user/home")
      }else{
        console.log("else called")
        setAlert(true)
      }
      

    }catch(err){
      console.log(err);
      
    }
  }
  console.log("details page",data)
  return (
    <div>
      <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-50 ">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col ">
            <div className="self-center text-xl font-light text-gray-800 sm:text-2xl ">
              Update Profile
            </div>
            
            <div className="mt-20">
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="email"
                      value={data}
                      id="create-account-pseudo"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Email"
                      {...register('email')}
                    />
                    {errors.email ? <span className="text-red-600 text">{errors.email.message}</span> : ""}
                  </div>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-first-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="First name"
                      {...register('firstName')}
                    />
                    {errors.firstName ? <span className="text-red-600 text">{errors.firstName.message}</span> : ""}
                  </div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-last-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Last name"
                      {...register('lastName')}
                      />
                      {errors.lastName ? <span className="text-red-600 text">{errors.lastName.message}</span> : ""}
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="tel"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Phone"
                      {...register('phone')}
                    />
                    {errors.phone ? <span className="text-red-600 text">{errors.phone.message}</span> : ""}
                  </div>

                </div>
                
                
                <div className="flex w-full my-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
          {alert && <Alert color="bg-orange-200" border="border-orange-500" message="Accound already exists continue" redirect="login" redirectText="Login"/>}

        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;










