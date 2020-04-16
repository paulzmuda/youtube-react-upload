import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import School from '@material-ui/icons/School';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { grey } from '@material-ui/core/colors';
import Content from '../Content';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  backgroundText: {
    color: grey[300],
  },
  heading: {
    paddingLeft: 32,
    paddingTop: 23,
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 500,
    // fontFamily: 'YT Sans, Roboto, Arial, sans-serif',
  },
  dashboardContainer: {
    padding: '24px 24px 0px 0px',
  },
  emptyChannel: {
    flex: 1,
    margin: '80px 24px 0',
  },
  uploadButton: {
    margin: theme.spacing(1),
    fontWeight: 600,
  },
  uploadHelpText: {
    fontSize: 13,
    verticalAlign: 'middle',
    color: '#000000',
  },
  getStartedText: {
    fontSize: 13,
    color: '#000000',
  },
}));

export default (props) => {
  const classes = useStyles();
  const emptyChannel = true;

  return (
    <Content props={props}>
      <Grid container> {/* if using spacing property the negative margin throws off an x-axis scroll  https://github.com/mui-org/material-ui/issues/7466 */}
        <Grid item>
          <Typography variant="h1" className={classes.heading}>Channel dashboard</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.dashboardContainer}>
        <Grid item>
          {
            emptyChannel ? (
              <Grid container justify="center" className={classes.emptyChannel}>
                <Grid item style={{textAlign: 'center', width: '100%'}}>
                  <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video.svg" alt="" />
                  <Typography component="div" style={{paddingTop: 11, paddingBottom: 9, fontSize: 15, fontFamily: 'Roboto, Noto, sans-serif'}}>Ready to get your channel started?</Typography>
                  <Button variant="contained" color="secondary" className={classes.uploadButton}>
                    Upload Video <ArrowDropDown />
                  </Button>
                  <a
                    style={{
                      verticalAlign: 'middle',
                      marginTop: 40,
                      display: 'block',
                      textDecoration: 'none',
                    }}
                    href="http://support.google.com/youtube/answer/57407?ref_topic=7505892"
                    target="_blank"
                  >
                    <HelpOutline style={{ color: 'rgba(0,0,0,.55)', verticalAlign: 'middle', marginRight: 4 }} />
                    <Typography variant="body2" component="span" className={classes.uploadHelpText}>Get help with uploading</Typography>
                  </a>
                  <a
                    style={{
                      verticalAlign: 'middle',
                      marginTop: 32,
                      display: 'block',
                      textDecoration: 'none',
                    }}
                    href="http://creatoracademy.youtube.com/page/course/bootcamp-foundations"
                    target="_blank"
                  >
                    <School
                      style={{
                        color: 'rgba(0,0,0,.55)',
                        verticalAlign: 'middle',
                        marginRight: 4
                      }}
                    />
                    <Typography
                      variant="body2"
                      component="span"
                      className={classes.getStartedText}
                    >
                      Take the "Get Started" course in Creator Academy
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            )
              : (<div>test</div>)
          }
          <Footer />
        </Grid>
      </Grid>
    </Content>
  );
};
