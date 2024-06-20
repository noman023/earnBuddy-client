import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import SpinnerComponent from "../../components/Spinner/Spinner";
import useUserRole from "../../hooks/useUserRole";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { userRole, isPending } = useUserRole();
  const location = useLocation();

  if (loading || isPending) {
    return <SpinnerComponent />;
  }

  //  if user logged in and role is admin then go to the children component
  if (user && userRole === "admin") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
}
