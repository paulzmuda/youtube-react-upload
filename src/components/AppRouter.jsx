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
import { app, auth, storageKey, handleGoogleToken } from '../utils/auth';
import { loadApi } from '../actions/gapi';
import { handleReceivedUser, handleNonUser } from '../actions/user';

// View Structure
import App from './App';

// Views
import Login from './Auth/Login';
import Dashboard from './Dashboard/Dashboard';
import Upload from './Upload/Upload';


// if logged in
const PrivateRoute = ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => (
  console.log(isAuthenticated),
  <Route
    {...rest} render={props => (
        isAuthenticated ? (
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
  }
  
  // // provider.addScope('');
// provider.addScope('');
// provider.addScope('');
// provider.addScope('');
// provider.addScope('');

  




  componentDidMount() {
    this.props.dispatch(loadApi());
  }

  


  // initClient = () => {
  //   // 2. Initialize the JavaScript client library.
    
  //   // window.gapi.client
  //   //   .init({
  //   //     apiKey: process.env.GOOGLE_API_KEY,
  //   //     clientId: process.env.GOOGLE_CLIENT_ID,
  //   //     scope: 'profile',
  //   //   })
  //   //   .then(() => {
  //   //   // 3. Initialize and make the API request.
  //   //   // load(this.onLoad);
  //   // }).then(function() {
  //   //   // 3. Initialize and make the API request.
  //   //   console.log('step 3');
  //   //   return window.gapi.client.request({
  //   //     'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
  //   //   })
  //   // }).then(function(response) {
  //   //     console.log('error note here')
  //   //   console.log(response.result);
  //   // }, function(reason) {
  //   //   console.log(reason);
  //   //   // console.log('Error: ' + reason.result.error.message);
  //   // });
  // };




  





  
  componentWillMount() {
    console.log('AppRouter: Will Mount')
  }

    // componentDidMount() {

  // }

  // async componentDidMount() {
  //   // const { from } = history.location.pathname || { from: { pathname: '/dashboard' } }
  //   console.log('AppRouter: Did Mount');
  //   this.mounted = true;
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id: process.env.GOOGLE_CLIENT_ID,
  //     }).then((auth2) => {
  //       if(!this.mounted) {
  //         return false;
  //       }
  //       this.auth2 = auth2;
  //       if(auth2.isSignedIn.get()) {
  //         console.log('Auth: User is logged in...');
  //         console.log(auth2.currentUser.get().getId());
  //         // await this.props.dispatch(handleReceivedUser(user));
  //       } else {
  //         // await this.props.dispatch(handleNonUser());
  //         history.push('/login');
  //       }
  //     });
  //   });


  // }
  
	componentWillUnmount() {
		this.mounted = false;
  }
  
  // isAuthenticated() {
  //   // await isAuthenticated();
  //   if(this.mounted) {
  //     console.log(this.auth2.isSignedIn.get());
  //     console.log('aadflkjasdf;kjasdf;lkjasdf;lasjdfl;kja')
  //     return this.auth2.isSignedIn.get();
  //   }
  //   console.log('blah')
  //   return false; // return GoogleAuth.isSignedIn.get();
  // }

  render() {
    console.log('AppRouter: Render');
    const authHandler = { auth, isAuthenticated: this.props.user.isAuthenticated, mounted: this.mounted };
    console.log(this.props.user.isAuthenticated);
    return (
      // <Provider store={this.props.store}>
      <Router history={history}>
        <Switch>
        <Route
            path="/" exact render={props => (
                !this.props.user.isAuthenticated 
                ? (
                  <Redirect to="/login" /> // window.location.assign('http://localhost:8802/login')
                ) : (
                  <Redirect to="/dashboard" />
                    )
                  )}
          />
          <Route path="/login" exact render={props => (<Login authHandler={authHandler} {...props} />)} />
          <Route
            path="/login" render={props => (
              !this.props.user.isAuthenticated
              ?
                (<Login authHandler={authHandler} {...props} />)
              :
                (<Redirect to="/dashboard" />)
            )}
          />

          
          <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={this.props.user.isAuthenticated} />
          <PrivateRoute exact path="/upload" component={Upload} isAuthenticated={this.props.user.isAuthenticated} />
          
          {/* any unexpected route */}
          <Route
            render={props => (
                !this.props.user.isAuthenticated 
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
