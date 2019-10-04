import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
            Dashboard
          </Typography>
          <Typography 
              variant="h2" 
              gutterBottom 
              className={classes.backgroundText}
              style={{ fontSize: 46}}
          >
            Blank Page
          </Typography>                   
        </center>
      </Grid>
    </Grid>
  );
}
