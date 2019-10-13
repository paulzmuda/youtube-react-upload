import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getYourPlaylists, getYourLikedVideos, getYourSubs, getYourChannel } from '../../../api/youtube';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Content from '../Content';

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
        console.log(channel);
    } catch(e) {
        // 
    } finally {
        console.log(channel);
        setLoaded(true);
    } 
  }

  React.useEffect(() => {
    preload();
  },[]);

  return (
    <Content>
      <Grid container
        direction="row"
        style={{paddingTop: 36, paddingLeft: 108}}
      >
        <Grid item xs={12}>
            <Typography variant="subtitle2">Created playlists</Typography><Typography variant="caption">[permissions]</Typography>
            <ul>
            {
                playlists ? 
                playlists.body.items.map((video)=> {
                    return (<li key={video.id}>{video.snippet.title}</li>)
                }) : null
            }
            </ul>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle2">Uploads</Typography><Typography variant="caption">[permissions]</Typography>
            <ul>
            {   console.log(channel),
                channel ? 
                channel.body.items.map((video)=> {
                    return (<li key={video.id}>{video.snippet.title}</li>)
                }) : null
            }
            </ul>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle2">Liked videos</Typography><Typography variant="caption">[permissions]</Typography>
            <ul>
            {
                likedVideos ? 
                likedVideos.body.items.map((video)=> {
                    return (<li key={video.id}>{video.snippet.title}</li>)
                }) : null
            }
            </ul>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle2">Saved playlists</Typography><Typography variant="caption">[permissions]</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle2">Subscriptions</Typography><Typography variant="caption">[permissions]</Typography>
            <ul>
            {
                subscriptions ? 
                subscriptions.body.items.map((video)=> {
                    return (<li key={video.id}>{video.snippet.title}</li>)
                }) : null
            }
            </ul>
        </Grid>
      </Grid>
    </Content>
  );
}
