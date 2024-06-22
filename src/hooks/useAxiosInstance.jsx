import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://earn-buddy-server.vercel.app",
});

export default function useAxiosInstance() {
  return axiosInstance;
}
