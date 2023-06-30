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

/************** HR API *****************/

export const getProfile_hr =async () => {
  try{
      return await Axios().get("/api/hr/profile")
  }catch(e){
      console.log(e)
  }
}