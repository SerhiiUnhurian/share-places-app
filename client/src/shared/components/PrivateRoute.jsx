import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...otherProps}
      render={routeProps =>
        currentUser ? <Component {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
