import { Axios } from "../baseUrl/api";

export const getPosts = () => {
  try {
    return Axios().get("/api/post/allPosts");
  } catch (e) {
    console.log(e);
  }
};
export const getProfile =async () => {
    try{
        return await Axios().get("/api/user/profile")
    }catch(e){
        console.log(e)
    }
}
export const getUserProfile =async () => {
  try{
      return await Axios().get("/api/profile/profile")
  }catch(e){
      console.log(e)
  }
}
export const authenticate =async () => {
  try{
      return await Axios().get("/api/user/auth")
  }catch(e){
      console.log(e)
  }
}
export const getAllJobs =async () => {
  try{
      return await Axios().get("/api/job/jobs")
  }catch(e){
      console.log(e)
  }
}


/************** HR API *****************/

export const getProfile_hr =async () => {
  try{
      return await Axios().get("/api/hr/profile")
  }catch(e){
      console.log(e)
  }
}