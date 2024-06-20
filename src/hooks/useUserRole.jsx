import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosInstanceSecure from "./useAxiosInstanceSecure";

export default function useUserRole() {
  const { user, loading } = useAuth();
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const { data: userRole, isPending } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosInstanceSecure.get(`/users/${user.email}`);

      return res.data;
    },
  });

  return { userRole, isPending };
}
