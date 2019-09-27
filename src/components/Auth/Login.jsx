import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Redirect, withRouter} from 'react-router-dom';

// import Auth from '../../utils/auth';


import { handleSignIn } from '../../actions/user';


// import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Hidden from '@material-ui/core/Hidden';

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';

import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Zoom from '@material-ui/core/Zoom';



// import test from '../../../images/test.png';  <img src={test} style={{width:155}}/>

const styles = theme => ({
  divider: {
    color: 'white'
  },
  root: theme.root,
  card: theme.card,
  // cssUnderline: {
  //   borderBottomColor: '#ffffff',
  //   '&:after': {
  //     borderBottomColor: amber[500],
  //   },
  //   '&:before': {
  //     borderBottomColor: lightBlue[500],
  //   },
  //   // ':hover': {
  //   //   borderBottomColor: amber[500],
  //   // },
  // }
});

class Login extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			email: {
                value: '',
                valid: true
            },
            password: {
              value: '',
              valid: {
                matches: true,
                minimum: true,
                requirements: true
              }
            },
            redirectToReferrer: false,
            sent: false,
            error: ''
		}
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
	}
  
  handleEmail = (e) => {
    const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      email : {
        "value": e.target.value,
        "valid": emailRE.test(e.target.value)
      }
    })
  };

  handlePassword = (e) => {
      this.setState({
          password: {
              value: e.target.value,
              valid: {
                  matches: true,
                  minimum: true,
                  requirements: true
              }
          }
      })
  }

  handleSignIn = () => {
      // auth.signInWithEmailAndPassword(this.state.email.value, this.state.password.value).then(() => {
      //     this.setState({redirectToReferrer: true});
      // }).catch((error) => {
      //     console.log(error);
      //     this.setState({error: error.code})
      // });
      // signInWithGoogle();
      this.props.dispatch(handleSignIn());
  }

  // componentDidMount(){
  //   document.title = "Login | AirRide";
  // }

  // componentDidMount() {
  //   window.gapi.load('auth2', () => {
  //       window.gapi.auth2.init({
  //       client_id: process.env.GOOGLE_CLIENT_ID,
  //   }).then(() => {
  //       window.gapi.signin2.render('my-signIn', {
  //         'scope': 'profile email',
  //         'width': 250,
  //         'height': 50,
  //         'longtitle': false,
  //         'theme': 'dark',
  //         // 'onsuccess': this.onSuccess,
  //         // 'onfailure': this.onFailure
  //       })
  //     }) 
  //   });
  // }
//  render = () => (<div id="my-signIn" />)

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || '/';
    const { redirectToReferrer } = this.state;
    
    return (
         <Grid container 
            style={{position: "absolute", top: "0px", left: "0px", width: '100%', height: '100%'}}
            justify='flex-start'
            alignItems='stretch'  
          >
            {
                (redirectToReferrer || this.props.isAuthenticated) && (<Redirect to={from || '/dashboard'}/>)
            }

            {/* <Hidden smDown>
            <Grid 
              item 
              lg={6} md={6}
              style={{backgroundColor: 'black'}}
            >
              filler text lorem ipsum blah blah blah
            </Grid>
            </Hidden> */}

            <Grid item
              lg={12} md={12} sm={12} xs={12}
              
            >
              <Grid container
                style={{width: '100%', height: '100%'}}
                direction='row'
                justify='center'
                alignItems='center'
                spacing={0}
              >


                <Grid item
                  lg={4} md={6} sm={8} xs={12}
                >
                  <Grid container
                    direction='row'
                    justify='flex-start'
                    alignItems='flex-start'
                    spacing={0}
                  >

                    <Grid 
                      item 
                      lg={12} md={12} sm={12} xs={12}
                    >
                      <Grid 
                        container 
                        direction='row'
                        justify='space-between'
                        alignItems='flex-start'
                        style={{paddingLeft:20, paddingRight: 20}}
                      >
                        <Grid item 
                          // xs={9} sm={9} md={9} lg={9} xl={9}
                          
                        >
                          {
                              (this.props.loading ?
                                      'LOADING' : null) ||
                              (this.props.error ?
                                      this.props.error : null) ||
                                (this.props.success ?
                                      this.props.success : null) ||
                              'Default text'       
                          }
                        </Grid>
                        <Grid item
                          // xs={3} sm={3} md={3} lg={3} xl={3}
                          // style={{marginLeft:30}}
                        >

                        </Grid>

                      </Grid>
                    </Grid>
                    <Grid 
                      item 
                      lg={12} md={12} sm={12} xs={12}
                    >
                      <div id="my-signIn"></div>
                    <Typography variant="h4" gutterBottom style={{marginBottom:20}}>
                      
                    </Typography>
                    <Paper className={classes.root} style={{ margin: 10, padding: 10}}>
                      <Typography variant="h6" component="h3">
                      </Typography>
                      <Typography variant="subtitle1" style={{marginBottom: 8}}>
                      </Typography>
                      <Grid 
                        container 
                        justify='flex-start'
                        alignItems='flex-start'
                      >

 
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <FormControl fullWidth>
                            <Input disabled={false} error={ !this.state.email.valid }
                              name={"email"}
                              onChange={this.handleEmail}
                              value={this.state.email.value}
                              classes={{
                                underline: classes.cssUnderline,
                              }}
                              // style={{color: 'black', margin: 5}}
                            />
                            <FormHelperText>
                              {
                                ((!this.state.email.valid && this.state.email.value.length > 0) ?
                                  'E.g. your_name@abctransport.com' : null) ||
                                // (this.props.registrationGeneral.emailAlreadyExists ?
                                //     'This email doesn\'t exist with us' : null) ||
                                'Email Address'
                              }
                            </FormHelperText>
                          </FormControl>
                        </Grid>


                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <FormControl fullWidth>
                            <Input disabled={false} error={ !this.state.password.valid.matches || this.state.error == 'auth/wrong-password'  }
                              name={"password"}
                              type="password"
                              onChange={this.handlePassword}
                              value={this.state.password.value}
                              classes={{
                                underline: classes.cssUnderline,
                              }}
                              // style={{color: 'black', margin: 5}}
                            />
                            <FormHelperText>Password</FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>



    <br />
                      </Paper>

                    </Grid>
                    <Grid 
                      item 
                      lg={12} md={12} sm={12} xs={12}
                    >
                      <Grid 
                        container 
                        direction='row'
                        justify='space-between'
                        alignItems='flex-start'
                        style={{paddingLeft:20, paddingRight: 20}}
                      >
                        <Grid item >
                        </Grid>
                        <Grid item
                        >
                              <Button 
                                variant="outlined" 
                                color="primary" 
                                className={classes.button} 
                                style={{marginTop:5, marginLeft: 0, align:'right'}}
                                onClick={
                                    e => {
                                            this.handleSignIn();
                                         }
                                }
                              >
                                Login
                              </Button>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid> 



            <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
              <center>
                <Typography variant="subtitle1" style={{ fontSize: 12, fontWeight: 100 }}><i>Copyright &copy; {(new Date()).getFullYear()} <a href="https://airridelogistics.com" target="_blank" style={{ fontSize: 12, fontWeight: 100 }}>AirRide Logistics, Inc</a>. All Rights Reserved.</i></Typography>
              </center>
            </div>
          </Grid>
    );
  }
}

// export default Home;
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
  error: user.login.errorMessage,
  success: user.login.successMessage,
  isAuthenticated: user.isAuthenticated,
});


// export default withStyles(styles)(Login);
export default connect(mapStateToProps)(withStyles(styles)(Login));
