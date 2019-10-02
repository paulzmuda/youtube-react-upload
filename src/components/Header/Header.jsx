import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { handleSignOut } from '../../actions/user';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExittoApp from '@material-ui/icons/ExittoApp';
import Youtube from '@material-ui/icons/Youtube';

import SvgIcon from '@material-ui/core/SvgIcon';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerAvatar: {
    height: 32, 
    width: 32, 
    marginRight: 16, 
    borderRadius: '50%', 
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    }
  }
}));

export default function Header() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.user);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = event => {
        setAuth(event.target.checked);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        dispatch(handleSignOut());
        setAnchorEl(null);
    };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" style={{ boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Youtube Uploader
          </Typography>
            <div>
                <img 
                  src={user.avatar}
                  onClick={handleMenu}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  className={classes.headerAvatar}
                />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <div style={{width: 300, padding: 16, boxSizing: 'border-box', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                  <Grid container>
                    <Grid item>
                      <img src={user.avatar} style={{ height: 40, width: 40, marginRight: 16, borderRadius: '50%', overflow: 'hidden' }}/>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        { user.firstName } {user.lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                
                <MenuItem style={{color: '#909090'}}><SvgIcon>
                                                        <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
                                                    </SvgIcon><Typography variant="body2">Your channel</Typography></MenuItem>
                <MenuItem style={{color: '#909090'}}><Youtube /><Typography variant="body2">YouTube</Typography></MenuItem>
                <MenuItem onClick={signOut} style={{color: '#909090'}}><ExittoApp /><Typography variant="body2">Sign Out</Typography></MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


