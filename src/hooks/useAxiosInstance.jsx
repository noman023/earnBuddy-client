import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://earn-buddy-server.vercel.app",
  // baseURL: "http://localhost:8000",
});

export default function useAxiosInstance() {
  return axiosInstance;
}
