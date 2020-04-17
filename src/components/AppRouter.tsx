import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Route,
  Router,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import history from '../history';
import { Store } from '../store';
import { loadGoogleApi } from '../utils/google-auth';
import { initAuth } from '../actions/user';

import App from './App';
import Login from './Auth/Login';
import Dashboard from './Content/Dashboard/Dashboard';
import YourChannel from './Content/YourChannel/YourChannel';
import Videos from './Content/Videos/Videos';
import Events from './Content/Events/Events';
import Settings from './Content/Settings/Settings';
import FullPageLoading from './Dialogs/FullPageLoading';
import FatalError from './Dialogs/FatalError';


type PrivateRoute = {
  children: React.ReactElement<any>
  exact?: boolean
  path: string
  isAuthenticated: Boolean
}

const PrivateRoute = ({
  children,
  exact = false,
  path,
  isAuthenticated,
}: PrivateRoute) => (
  <Route
    path={path}
    exact={exact}
    render={(renderProps: RouteComponentProps) => (
      isAuthenticated ? (
        <App
          match={renderProps.match}
          location={renderProps.location}
          history={renderProps.history}
          staticContext={renderProps.staticContext}
        >
          { children }
        </App>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: path }}
        />
      )
    )}
  />
);

const AppRouter = () => {
  const [authFatalError, setAuthFatalError] = React.useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(({ user }: Store) => user);

  // Don't do anything until Google API is available in client window
  const preloadGoogleApi = async () => {
    try {
      const apiStatus = await loadGoogleApi();
      if (apiStatus) {
        dispatch(initAuth());
      }
    } catch (e) {
      setAuthFatalError(true);
    }
  };

  React.useEffect(() => {
    preloadGoogleApi();
  }, []);

  console.log('AppRouter: Render');

  if (!userData.authReady && !authFatalError) {
    return (<FullPageLoading />);
  }

  if (authFatalError) {
    return (<FatalError />);
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            !userData.isAuthenticated ? (
              <Redirect to={{ pathname: '/login', state: null }} />
            ) : (
              <Redirect to={{ pathname: '/dashboard', state: null }} />
            )
          )}
        />
        <Route
          path="/login"
          exact
          render={(renderProps: RouteComponentProps) => (
            !userData.isAuthenticated ? (
              <Login
                match={renderProps.match}
                location={renderProps.location}
                history={renderProps.history}
                staticContext={renderProps.staticContext}
              />
            ) : (
              <Redirect
                to={{
                  pathname: (typeof renderProps.location.state === 'string' && renderProps.location.state) || '/dashboard',
                  state: null,
                }}
              />
            )
          )}
        />

        {/* Private Routes */}
        <PrivateRoute exact path="/dashboard" isAuthenticated={userData.isAuthenticated}>
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path="/channel" isAuthenticated={userData.isAuthenticated}>
          <YourChannel />
        </PrivateRoute>

        <PrivateRoute exact path="/videos" isAuthenticated={userData.isAuthenticated}>
          <Videos />
        </PrivateRoute>

        <PrivateRoute exact path="/events" isAuthenticated={userData.isAuthenticated}>
          <Events />
        </PrivateRoute>

        <PrivateRoute exact path="/settings" isAuthenticated={userData.isAuthenticated}>
          <Settings />
        </PrivateRoute>

        {/* Catch-all */}
        <Route
          render={() => (
            !userData.isAuthenticated ? (
              <Redirect to={{ pathname: '/login', state: null }} />
            ) : (
              <Redirect to={{ pathname: '/dashboard', state: null }} />
            )
          )}
        />
      </Switch>
    </Router>
  );
};

AppRouter.displayName = 'components/AppRouter';

export default hot(AppRouter);
