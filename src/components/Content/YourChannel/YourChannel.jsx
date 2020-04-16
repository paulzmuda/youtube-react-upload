import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getYourPlaylists,
  getYourLikedVideos,
  getYourSubs,
  getYourChannel,
} from '../../../api/youtube';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Content from '../Content';
import ContentLoading from '../ContentLoading';

const useStyles = makeStyles({
  //   backgroundText: {
  //     color: grey[300]
  //   }
});

export default () => {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [playlists, setPlaylists] = React.useState(false);
  const [likedVideos, setLikedVideos] = React.useState(false);
  const [subscriptions, setSubscriptions] = React.useState(false);
  const [channel, setChannel] = React.useState(false);

  const preload = async () => {
    try {
      setPlaylists(await getYourPlaylists());
      setLikedVideos(await getYourLikedVideos());
      setSubscriptions(await getYourSubs());
      setChannel(await getYourChannel());
    } catch (e) {
      console.log(e);
    } finally {
      setLoaded(true);
    }
  };

  React.useEffect(() => {
    preload();
  }, []);

  console.log(loaded);

  return loaded ? (
    <Content>
      <Grid
        container
        direction="row"
        style={{ paddingTop: 36, paddingLeft: 108 }}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle2">Created playlists</Typography>
          <Typography variant="caption">[permissions]</Typography>
          {playlists &&
            playlists.body.items.map((video, i) => {
              return (
                <p key={i}>
                  <h3>{video.snippet.title}</h3>
                  <img src={video.snippet.thumbnails.medium.url} />
                </p>
              );
            })}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Liked videos</Typography>
          <Typography variant="caption">[permissions]</Typography>
          {likedVideos &&
            likedVideos.body.items.map((video, i) => {
              return (
                <p key={i}>
                  <h3>{video.snippet.title}</h3>
                  <img src={video.snippet.thumbnails.medium.url} />
                </p>
              );
            })}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Saved playlists</Typography>
          <Typography variant="caption">[permissions]</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Subscriptions</Typography>
          <Typography variant="caption">[permissions]</Typography>
          {subscriptions &&
            subscriptions.body.items.map((video, i) => {
              return (
                <p key={i}>
                  <h3>{video.snippet.title}</h3>
                  <img src={video.snippet.thumbnails.medium.url} />
                </p>
              );
            })}
        </Grid>
      </Grid>
    </Content>
  ) : (
    <Content>
      <ContentLoading />
    </Content>
  );
};
