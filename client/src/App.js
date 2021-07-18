import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import EditProfile from './Auth/pages/EditProfile';
import Login from './Auth/pages/Login';
import PasswordReset from './Auth/pages/PasswordReset';
import Profile from './Auth/pages/Profile';
import Registration from './Auth/pages/Registration';
import EditPlace from './places/pages/EditPlace';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import Header from './shared/components/Header';
import PrivateRoute from './shared/components/PrivateRoute';
import AuthProvider from './shared/context/AuthContext';
import Users from './users/pages/Users';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Users} />
            <PrivateRoute path="/places/new" component={NewPlace} />
            <PrivateRoute path="/places/:placeId" component={EditPlace} />
            <Route path="/:userId/places" component={UserPlaces} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/password-reset" component={PasswordReset} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
