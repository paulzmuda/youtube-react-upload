import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';

import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Zoom from '@material-ui/core/Zoom';

// send form
import { connect } from 'react-redux';
import { handleSignOut } from '../../actions/user';


// import test from '../../../images/test.png';  <img src={test} style={{width:155}}/>

const styles = theme => ({
  divider: {
    color: 'white'
  },
  root: theme.root,
  card: theme.card,
  cssUnderline: {
    borderBottomColor: '#ffffff',
    '&:after': {
      borderBottomColor: amber[500],
    },
    '&:before': {
      borderBottomColor: lightBlue[500],
    },
    // ':hover': {
    //   borderBottomColor: amber[500],
    // },
  }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
          };
        this.logout = this.logout.bind(this);
    }
  
 
  logout() {
      this.props.dispatch(handleSignOut());
  }

  componentDidMount(){
    document.title = "Youtube Dashboard";
  }

  render() {
    const { classes } = this.props;
    return (
          <Grid container 
            style={{position: "absolute", top: "0px", left: "0px", width: '100%', height: '100%'}}
            justify='center'
            alignItems='center'  
          >
            <Grid item xs={12}>
                <Button onClick={this.logout}>test</Button>
              <center>
              
                <Typography 
                    variant="overline" 
                    gutterBottom 
                    style={{ color: '#e0e0e0', paddingTop: 0, width: '100%', height: '100%', fontSize: 18}}
                >
                  test
                </Typography>
              
                <Typography 
                    variant="h2" 
                    gutterBottom 
                    style={{ color: '#e0e0e0', paddingTop: 0, paddingBottom: 15, width: '100%', height: '100%', fontSize: 46}}
                >
                  test 2
                </Typography>

                  <Typography 
                      variant="caption" 
                      gutterBottom 
                      style={{ color: '#e0e0e0', paddingTop: 0, width: '100%', height: '100%', fontSize: 18}}
                  >
                    {/* follow up text here if any.......?????? */}
                  </Typography>
                                                    
              </center>
            </Grid>
            <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
              <center>
                <Typography variant="subtitle1" style={{color: 'white', fontSize: 12, fontWeight: 100}}><i>AvailableTrucks.Info is a part of the AirRide Suite of Carrier Tools. Copyright &copy; {(new Date()).getFullYear()} <a href="https://airridelogistics.com" target="_blank" style={{color: 'white', fontSize: 12, fontWeight: 100}}>AirRide Logistics, Inc</a>. All Rights Reserved.</i></Typography>
              </center>
            </div>
          </Grid>

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = ({singleCapacityDisplay}) => ({
//   singleCapacityDisplay: singleCapacityDisplay
// });

export default connect(/*mapStateToProps*/)(withStyles(styles, { withTheme: true })(Dashboard)); // export default withStyles(styles)(Home);