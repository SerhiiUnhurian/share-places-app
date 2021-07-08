import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import Header from './shared/components/Header';
import Users from './users/pages/Users';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Users />
            </Route>
            <Route exact path="/:userId/places">
              <UserPlaces />
            </Route>
            <Route exact path="/places/new">
              <NewPlace />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
