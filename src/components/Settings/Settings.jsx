import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { handleInvalidateAccess } from '../../actions/user';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  pageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
  },
  backgroundText: {
    color: '#e0e0e0'
  }
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const invalidateUser = () => {
    dispatch(handleInvalidateAccess());
  }
  return (
    <Grid container 
      className={classes.pageContainer}
      direction="row"
      justify='center'
      alignItems='center'  
    >
      <Grid item xs={12}>
        <center>
          <Typography 
              variant="overline" 
              gutterBottom
              className={classes.backgroundText}
              style={{ fontSize: 18}}
          >
            Settings
          </Typography>
          <Button onClick={invalidateUser}>Revoke App Access to your Data</Button>
        </center>
      </Grid>
    </Grid>
  );
}
