import { Navigate } from 'react-router-dom';

interface IProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

const PrivateRoute = ({ isAuthenticated, children }:IProps) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
