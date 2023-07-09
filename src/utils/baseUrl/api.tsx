import axios from "axios";
// import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
export const Axios = () => {
  // const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost",
  });

  api.interceptors.response.use((res: any) => {
    if (res.status === null) {
      // navigate("/login");
    } else {
      return res;
    }
  },(error)=>{
    // navigate("/login");
  }
  );
  return api;
}; 