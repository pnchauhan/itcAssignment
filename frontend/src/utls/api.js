import axios from "axios";

export default function () {

const uri= process.env.API_URI ?? 'http://localhost:8000/api/v1/' ;
  const axiosInstance = axios.create({
    baseURL: `${uri}`,
    
  });

  axiosInstance.interceptors.response.use(
    (response) => { return response},
    (error) => {
        console.log('frontend error', error)
  
    }
  );

  return axiosInstance;
}
