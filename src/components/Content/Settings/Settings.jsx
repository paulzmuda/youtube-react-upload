import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { openCloseSettingsRevokeModal } from '../../../actions/ui';
import Content from '../Content';
import RevokeModal from './RevokeModal';

const useStyles = makeStyles({
  backgroundText: {
    color: grey[300],
  },
});

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const openRevokeModal = () => {
    dispatch(openCloseSettingsRevokeModal(true));
  };
  return (
    <Content>
      <Grid container direction="row">
        <RevokeModal />
        <Grid item xs={12}>
          <Typography
            variant="overline"
            gutterBottom
            className={classes.backgroundText}
            style={{ fontSize: 18 }}
          >
            Settings
          </Typography>
          <Button onClick={openRevokeModal}>Revoke Access</Button>
        </Grid>
      </Grid>
    </Content>
  );
};
