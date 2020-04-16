import { hot } from 'react-hot-loader/root';
import React from 'react';
import history from '../history';
import { Route, Router, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

const PrivateRoute = ({ children, exact = false, path, isAuthenticated }: PrivateRoute) => (
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
  const user = useSelector(({ user }: Store) => user);

  // Don't do anything until Google API is available in client window
  const preloadGoogleApi = async () => {
    try {
      const apiStatus = await loadGoogleApi();
      if (apiStatus) {
        dispatch(initAuth());
      }
    } catch (e) {
      console.log(e);
      setAuthFatalError(true);
    }
  };

  React.useEffect(() => {
    preloadGoogleApi();
  }, []);

  console.log('AppRouter: Render');

  if (!user.authReady && !authFatalError) {
    return <FullPageLoading />;
  }

  if (authFatalError) {
    return <FatalError />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            !user.isAuthenticated ? (
              <Redirect to={{ pathname: '/login', state: null }} />
            ) : (
              <Redirect to={{ pathname: '/dashboard', state: null }} />
            )
          }
        />
        <Route
          path="/login"
          exact
          render={(renderProps) =>
            !user.isAuthenticated ? (
              <Login {...renderProps} />
            ) : (
              <Redirect
                to={{
                  pathname: (typeof renderProps.location.state === 'string' && renderProps.location.state) || '/dashboard',
                  state: null,
                }}
              />
            )
          }
        />

        {/* Private Routes */}
        <PrivateRoute exact path="/dashboard" isAuthenticated={user.isAuthenticated}>
          <Dashboard />
        </PrivateRoute>
        
        <PrivateRoute exact path="/channel" isAuthenticated={user.isAuthenticated}>
          <YourChannel />
        </PrivateRoute>

        <PrivateRoute exact path="/videos" isAuthenticated={user.isAuthenticated}>
          <Videos />
        </PrivateRoute>

        <PrivateRoute exact path="/events" isAuthenticated={user.isAuthenticated}>
          <Events />
        </PrivateRoute>

        <PrivateRoute exact path="/settings" isAuthenticated={user.isAuthenticated}>
          <Settings />
        </PrivateRoute>

        {/* Catch-all */}
        <Route
          render={() =>
            !user.isAuthenticated ? (
              <Redirect to={{ pathname: '/login', state: null }} />
            ) : (
              <Redirect to={{ pathname: '/dashboard', state: null }} />
            )}
        />
      </Switch>
    </Router>
  );
};

export default hot(AppRouter);
