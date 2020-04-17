import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExittoApp from '@material-ui/icons/ExitToApp';
import Youtube from '@material-ui/icons/YouTube';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import { Store } from '../../store';
import { handleSignOut } from '../../actions/user';
import { openCloseDrawer } from '../../actions/ui';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.1)',
  },
  avatarWrapper: {
    '&:focus': {
      outline: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
    },
  },
  headerAvatar: {
    height: 32,
    width: 32,
    marginTop: 4,
    borderRadius: '50%',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  innerMenuAvatar: {
    height: 40,
    width: 40,
    marginRight: 16,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  innerMenuUserName: {
    fontSize: 16,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    paddingRight: 16,
    fontSize: 40,
    color: '#909090',
    transform: 'rotate(0.03deg)',
  },
  menu: {
    width: 300,
    padding: 16,
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
}));

type Props = {
  goTo: (path: string) => void
}

const Header = ({
  goTo,
}: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userData = useSelector(({ user }: Store) => user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawer = () => {
    dispatch(openCloseDrawer());
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (path: string) => {
    goTo(path);
    handleClose();
  };

  const navHref = (path: string) => {
    window.open(path, '_blank');
    handleClose();
  };

  const signOut = () => {
    dispatch(handleSignOut());
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
          >
            <MenuIcon style={{ color: '#909090' }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <span
              onClick={() => goTo('/dashboard')}
              onKeyPress={() => goTo('/dashboard')}
              tabIndex={0}
              role="button"
              style={{ cursor: 'pointer' }}
            >
              Youtube Channel Manager
            </span>
          </Typography>
          <div>
            <span
              onClick={handleMenuClick}
              onKeyPress={handleMenuKey}
              role="button"
              tabIndex={0}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              className={classes.avatarWrapper}
            >
              <img
                src={userData.avatar}
                className={classes.headerAvatar}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
            </span>
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
              <div className={classes.menu}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      src={userData.avatar}
                      className={classes.innerMenuAvatar}
                      alt={`${userData.firstName} ${userData.lastName}`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.innerMenuUserName}
                    >
                      {`${userData.firstName} ${userData.lastName}`}
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <MenuItem onClick={() => navigate('/channel')}>
                <SvgIcon className={classes.menuIcon}>
                  <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
                </SvgIcon>
                <Typography variant="body2">Your channel</Typography>
              </MenuItem>
              <MenuItem onClick={() => navHref('http://www.youtube.com')}>
                <Youtube className={classes.menuIcon} />
                <Typography variant="body2">YouTube</Typography>
              </MenuItem>
              <MenuItem onClick={signOut}>
                <ExittoApp className={classes.menuIcon} />
                <Typography variant="body2">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.displayName = 'components/Header/Header';

export default Header;
