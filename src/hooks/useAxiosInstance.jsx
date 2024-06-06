import axios from "axios";

const axiosInstace = axios.create({ baseURL: "http://localhost:8000/" });

export default function useAxiosInstance() {
  return axiosInstace;
}
