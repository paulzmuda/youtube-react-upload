import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Content from '../Content';

const useStyles = makeStyles({
  backgroundText: {
    color: grey[300]
  }
});

export default () => {
  const classes = useStyles();

  return (
    <Content>
      <Grid container
        direction="row"
      >
        <Grid item xs={12}>
            <Typography 
                variant="overline" 
                gutterBottom
                className={classes.backgroundText}
                style={{ fontSize: 18}}
            >
              Events
            </Typography>
            <Typography
                variant="h2" 
                gutterBottom 
                className={classes.backgroundText}
                style={{ fontSize: 46}}
            >
              Blank Page
            </Typography>   
        </Grid>
      </Grid>
    </Content>
  );
}
