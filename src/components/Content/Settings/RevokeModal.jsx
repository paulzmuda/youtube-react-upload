import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInvalidateAccess } from '../../../actions/user';
import { openCloseSettingsRevokeModal } from '../../../actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { grey } from "@material-ui/core/colors";
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    mockButton: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      color: theme.palette.primary.main,
    },
    paragraph: {
        ...theme.typography.body1,
        color: grey[600] // because DialogContentText screams at you for nested <p> tags and this color matches
    }
  }));

export default () => {
    const classes = useStyles();
    const open = useSelector(state => state.ui.settingsRevokeModalOpen);
    const dispatch = useDispatch();
    
    const invalidateUser = () => {
        dispatch(handleInvalidateAccess());
    }
  
    const handleClose = () => {
        dispatch(openCloseSettingsRevokeModal(false));
    };
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Revoke access to your Google account?"}</DialogTitle>
          <DialogContent>
              <span className={classes.paragraph}>The first time you signed in, you had granted this app access to your Google account. By revoking access, you are resetting those granted permissions.</span>
              <p className={classes.paragraph}>By selecting <span className={classes.mockButton}>revoke</span> you will also be immediately signed out.</p>
              <p className={classes.paragraph}>You can find more information here: <Link href={"https://support.google.com/accounts/answer/3466521?hl=en"} target="_blank" rel="noopener">https://support.google.com/accounts/answer/3466521?hl=en</Link></p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={invalidateUser} color="primary" autoFocus>
              Revoke
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }