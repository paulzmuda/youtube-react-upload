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
  container: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  heading: {
    color: grey[300],
    paddingTop: 0,
    paddingBottom: 15,
    width: '100%',
    height: '100%',
    fontSize: 56,
  },
  caption: {
    color: grey[300],
    paddingTop: 0,
    width: '100%',
    height: '100%',
    fontSize: 18,
    fontWeight: 100,
  },
});

const YoutubeLinearProgress = withStyles({
  root: {
    backgroundColor: lighten('#FF0000', 0.5),
  },
  bar: {
    backgroundColor: '#FF0000',
  },
})(LinearProgress);

const FullPageLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <YoutubeLinearProgress variant="query" color="primary" />
      <Grid
        container
        className={classes.container}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            gutterBottom
            className={classes.heading}
          >
            Loading
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.caption}
          >
            Please wait
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

FullPageLoading.displayName = 'components/Dialogs/FullPageLoading';

export default FullPageLoading;
