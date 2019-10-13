import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { handleSignIn } from '../../actions/user';
import { makeStyles } from '@material-ui/core/styles';
import FullPageLoading from '../Dialogs/FullPageLoading';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  divider: {
    color: 'white'
  },
  root: theme.root,

  fullPageContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.2))', 
    backgroundSize: 'cover'
  },
  signInContainer: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
  anonAvatar: {
    height: 48, 
    fontSize: 48, 
    color: '#FF0000'
  }
}));

export default (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const signIn = () => {
      dispatch(handleSignIn());
  }
  const { from } = props.location.state || '/';
  console.log(props);
  console.log('Login: Render');
  
  if(user.loading) {
    return (<FullPageLoading />);
  }

  return (
    <Grid container 
      justify='flex-start'
      alignItems='stretch'
      className={classes.fullPageContainer}
    >
      {
          (user.isAuthenticated) && (<Redirect to={from || '/dashboard'}/>)
      }
      <Grid item
        lg={12} md={12} sm={12} xs={12}
      >
        <Grid container
          style={{width: '100vw', height: '100vh'}}
          direction='row'
          justify='center'
          alignItems='center'
          spacing={0}
        >
          <Grid item
            xl={3} lg={4} md={6} sm={8} xs={12}
          >
              <Paper 
                className={classes.signInContainer} 
                style={{ margin: 10, padding: 10}} 
                onClick={signIn}
                title="Click here to sign in"
              >
                  <Grid 
                    container
                    direction="row"
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                      <AccountCircle className={classes.anonAvatar} />
                    </Grid>
                    <Grid item xs={8} sm={6} md={8} lg={8} xl={8}>
                      <Typography variant="overline" style={{marginBottom: 8, fontSize: 14}}>
                        Sign in with google
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} style={{textAlign: 'right'}}>
                      <KeyboardArrowRight style={{ height: 48, fontSize: 48, color: grey[600], flex: 1}} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
        </Grid>
      </Grid> 
      <div style={{position: 'fixed', bottom: 0, width: '95vw', padding: 8}}>
        <Grid container>
          <Grid item md={12} style={{textAlign: 'center'}}>
              <Typography variant="subtitle2" style={{ fontSize: 10, fontWeight: 100, color: grey[600] }}><i>This is a blind, serverless application. No data is stored while using this demo other than anything sent directly to the Google API. This is only an example of how to integrate the Google API.</i></Typography>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
