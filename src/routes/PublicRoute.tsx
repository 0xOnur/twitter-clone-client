import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
  }

const PublicRoute = ({ isAuthenticated, children }:PublicRouteProps) => {
    return isAuthenticated ? <Navigate to="/" /> : children;
    };
export default PublicRoute;
