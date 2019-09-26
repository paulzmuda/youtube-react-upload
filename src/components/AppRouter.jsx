import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';

// router
import history from '../history';  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
import { Route, Router, Redirect, Switch } from 'react-router-dom';

// redux
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

// auth 0
import { app, auth, isAuthenticated, storageKey, handleGoogleToken } from '../utils/auth';
import { handleReceivedUser, handleNonUser } from '../actions/user';

// View Structure
import App from './App';

// Views
import Login from './Auth/Login';
import Dashboard from './Dashboard/Dashboard';
import Upload from './Upload/Upload';


// if logged in
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest} render={props => (
          isAuthenticated() ? (
            <App {...props}><Component {...props} /></App>
          ) : (
            <Redirect to='/login' />
          )
      )}
    />
  );

class AppRouter extends React.Component {

  constructor(props) {
		super(props);
		// this.goTo = this.goTo.bind(this);
		this.state = {
			uid: null,
		}
    this.initClient = this.initClient.bind(this);
	}

  // static propTypes = {
  //   context: PropTypes.shape(ContextType),
  //     // store: PropTypes.any, // eslint-disable-line
  //     // isAuthenticated: PropTypes.bool.isRequired,
  // };
  // static defaultProps = {
  //   context: null,
  // };
  // static contextTypes = {
  //   router: PropTypes.any,
  //   // store: PropTypes.any,
  // };
  // static childContextTypes = ContextType;

  


  initClient = () => {
    // 2. Initialize the JavaScript client library.
    
    // window.gapi.client
    //   .init({
    //     apiKey: process.env.GOOGLE_API_KEY,
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     scope: 'profile',
    //   })
    //   .then(() => {
    //   // 3. Initialize and make the API request.
    //   // load(this.onLoad);
    // }).then(function() {
    //   // 3. Initialize and make the API request.
    //   console.log('step 3');
    //   return window.gapi.client.request({
    //     'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    //   })
    // }).then(function(response) {
    //     console.log('error note here')
    //   console.log(response.result);
    // }, function(reason) {
    //   console.log(reason);
    //   // console.log('Error: ' + reason.result.error.message);
    // });
  };




  





  
  componentWillMount() {
    console.log('AppRouter: Will Mount')
  }

  async componentDidMount() {
    // const { from } = history.location.pathname || { from: { pathname: '/dashboard' } }
    console.log('AppRouter: Did Mount')
    this.mounted = true;
    await auth.onAuthStateChanged(async user => {
      if(!this.mounted) {
        return false;
      }
      if(user) {
        console.log('Auth: User is logged in...')
        await this.props.dispatch(handleReceivedUser(user));
        // const accessToken = await auth.currentUser.getIdToken(/* forceRefresh */true);
        console.log('here-----');
        // console.log(accessToken);
        window.gapi.load("client", this.initClient);
        console.log('----and there....');
        handleGoogleToken();
      } else {
        await this.props.dispatch(handleNonUser());
        history.push('/login');
      }
    })
  }
  
	componentWillUnmount() {
		this.mounted = false;
	}

  render() {
    console.log('AppRouter: Render');
    const authHandler = { auth, isAuthenticated: isAuthenticated(), mounted: this.mounted };
    return (
      // <Provider store={this.props.store}>
      <Router history={history}>
        <Switch>
        <Route
            path="/" exact render={props => (
                !isAuthenticated()
                || !this.props.user.isAuthenticated 
                ? (
                  <Redirect to="/login" /> // window.location.assign('http://localhost:8802/login')
                ) : (
                  <Redirect to="/dashboard" />
                    )
                  )}
          />
          <Route path="/login" exact render={props => (<Login {...props} />)} />
          <Route
            path="/login" render={props => (
              !isAuthenticated()
              || !this.props.user.isAuthenticated
              ?
                (<Login authHandler={authHandler} {...props} />)
              :
                (<Redirect to="/dashboard" />)
            )}
          />

          
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/upload" component={Upload} />
          
          {/* any unexpected route */}
          <Route
            render={props => (
                !isAuthenticated() 
                || !this.props.user.isAuthenticated 
                ? (
                  <Redirect to="/login" /> // window.location.assign('http://localhost:8802/login')
                ) : (
                  <Redirect to="/dashboard" />
                    )
                  )}
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(hot(AppRouter));
