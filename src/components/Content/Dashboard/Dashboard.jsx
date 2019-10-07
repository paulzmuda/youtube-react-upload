import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Content from '../Content';

const useStyles = makeStyles({
  // pageContainer: props => ({
  //   ...props.classes.pageContainer,
  // }),
  backgroundText: {
    color: grey[300]
  }
});

export default (props) => {
  const classes = useStyles();

  return (
    <Content props={props}>
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
        </Grid>
      </Grid>
    </Content>
  );
}
