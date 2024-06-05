import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SpinnerComponent from "../../components/Spinner/Spinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SpinnerComponent />;
  }

  //   if user logged in then go to the children component
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} />;
}
