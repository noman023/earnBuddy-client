import useAuth from "./useAuth";
import useAxiosInstanceSecure from "./useAxiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";

export default function useUserCoins() {
  const { user, loading } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { data: userCoins, isPending: isCoinsPending } = useQuery({
    queryKey: ["userCoins", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(
        `/users/${user.email}?coins=true`
      );

      return res.data;
    },
  });

  return { userCoins, isCoinsPending };
}
