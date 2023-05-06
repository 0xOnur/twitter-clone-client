import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

const PrivateRoute = ({ isAuthenticated, children }:PrivateRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
