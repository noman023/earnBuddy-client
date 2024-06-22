import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstanceSecure = axios.create({
  // baseURL: "https://earn-buddy-server.vercel.app",
  baseURL: "http://localhost:8000",
});

export default function useAxiosInstanceSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // adding interceptor in request to add authorization header for every secure call to the api
  axiosInstanceSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // intercepts 400, 401 and 403 status
  axiosInstanceSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // for 401 or 403 logout the user and navigate to the login
      if (status === 400 || status === 401) {
        await logOut();
        navigate("/login");
      } else if (status === 403) {
        navigate("/forbidden");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstanceSecure;
}
