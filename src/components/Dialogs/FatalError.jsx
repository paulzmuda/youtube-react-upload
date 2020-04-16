import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
        }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <center>
            <Typography
              variant="h2"
              gutterBottom
              style={{
                color: grey[300],
                paddingTop: 0,
                paddingBottom: 15,
                width: '100%',
                height: '100%',
                fontSize: 56,
              }}
            >
              Error
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              style={{
                color: grey[300],
                paddingTop: 0,
                width: '100%',
                height: '100%',
                fontSize: 18,
                fontWeight: 100,
              }}
            >
              please try reloading the page
            </Typography>
          </center>
        </Grid>
      </Grid>
    </div>
  );
};
