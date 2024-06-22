import { useQuery } from "@tanstack/react-query";

import useAxiosInstance from "../../../hooks/useAxiosInstance";
import TopEarnersCard from "./TopEarnersCard";
import SpinnerComponent from "../../../components/Spinner/Spinner";

export default function TopEarners() {
  const axiosInstance = useAxiosInstance();

  const { data = [], isPending } = useQuery({
    queryKey: ["topEarners"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/topEarners`);
      return res.data;
    },
  });

  return (
    <div className="my-24">
      <div className="text-3xl md:text-4xl text-black text-center mb-10">
        <h1>
          T<span className="text-blue-500">o</span>p E
          <span className="text-blue-500">a</span>rn
          <span className="text-blue-500">e</span>rs
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {isPending && <SpinnerComponent />}

        {data.map((user) => (
          <TopEarnersCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
