import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import SpinnerComponent from "../../components/Spinner/Spinner";

export default function WorkerRoute() {
  const { user, loading } = useAuth();
  const { userRole, isPending } = useUserRole();
  const location = useLocation();

  if (loading || isPending) {
    return <SpinnerComponent />;
  }

  //  if user logged in and role is worker then go to the children component
  if (user && userRole === "worker") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
}
