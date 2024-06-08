import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstaceSecure = axios.create({
  baseURL: "http://localhost:8000",
});

export default function useAxiosInstanceSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // adding interceptor in request to add authorization header for every secure call to the api
  axiosInstaceSecure.interceptors.request.use(
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
  axiosInstaceSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // for 401 or 403 logout the user and navigate to the login
      if (status === 400 || status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstaceSecure;
}
