import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/Auth/useAuth";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
  useAuth();

  return (
    <>
      {isAuthenticated ? children : <Navigate to="/login" />}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
