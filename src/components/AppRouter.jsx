import { hot } from 'react-hot-loader/root';
import React from 'react';
import history from '../history';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadGoogleApi } from '../utils/google-auth';
import { listenAuth } from '../actions/user';
import App from './App';
import Login from './Auth/Login';
import Dashboard from './Content/Dashboard/Dashboard';
import YourChannel from './Content/YourChannel/YourChannel';
import Videos from './Content/Videos/Videos';
import Events from './Content/Events/Events';
import Settings from './Content/Settings/Settings';
import FullPageLoading from './Dialogs/FullPageLoading';
import FatalError from './Dialogs/FatalError';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest} render={props => (
      console.log('authorized? ' + isAuthenticated),
      isAuthenticated ? (
          <App {...props}><Component {...props} /></App>
        ) : (
          <Redirect to='/login' />
        )
    )}
  />
);

const AppRouter = () => {
    const [authReady, setAuthReady] = React.useState(false);
    const [authFatalError, setAuthFatalError] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    // Don't render anything until we've loaded our Google API externally (found in the head of index.html)
    const preloadGoogleApi = async () => {
      try {
        const apiStatus = await loadGoogleApi();
        if(apiStatus) {
          setAuthReady(apiStatus);
          dispatch(listenAuth()); 
        }
      } catch(e) {
        console.log(e);
        setAuthFatalError(true);
      }        
    }

    // componentDidMount
    React.useEffect(() => {
      preloadGoogleApi();
    },[]);

    console.log('AppRouter: Render');

    if(!authReady && !authFatalError) {
      return (<FullPageLoading />);
    }

    if(authFatalError) {
      return (<FatalError />);
    }
    
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/" exact render={props => (
                !user.isAuthenticated 
                ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/dashboard" />
                    )
                  )}
          />
          <Route 
            path="/login" exact render={props => (
              // console.log(user.isAuthenticated),
              !user.isAuthenticated
              ?
                (<Login {...props} />)
              :
                (<Redirect to="/dashboard" />)
            )} 
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={user.isAuthenticated} />
          <PrivateRoute exact path="/channel" component={YourChannel} isAuthenticated={user.isAuthenticated} />
          <PrivateRoute exact path="/videos" component={Videos} isAuthenticated={user.isAuthenticated} />
          <PrivateRoute exact path="/events" component={Events} isAuthenticated={user.isAuthenticated} />
          <PrivateRoute exact path="/settings" component={Settings} isAuthenticated={user.isAuthenticated} />
          
          {/* any unexpected route */}
          <Route
            render={() => (
                !user.isAuthenticated 
                ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/dashboard" />
                    )
                  )}
          />
        </Switch>
      </Router>
    );
  }

export default hot(AppRouter);
