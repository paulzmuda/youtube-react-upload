import React from 'react';
import { useSelector } from 'react-redux'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideosIcon from '@material-ui/icons/VideoLibrary';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
        margin: '0 auto',
        marginBottom: 16,
        padding: 16,
        borderRadius: '50%', 
        overflow: 'hidden',
    },
    avatarFull: {
      height: 108, 
      width: 108, 
    },
    avatarShrink: {
      height: 36,
      width: 36,
    },
    listItem: {
        '&:hover span, &:hover svg': {
            color: '#c4302b',
        },
    },
    listItemIcon: {
      paddingLeft: 8,
    },
    primaryText: {
        color: '#626363',
        fontSize: 14,
    },
  }),
);

export default function Sidebar() {
    const classes = useStyles();
    const avatar = useSelector(state => state.user.avatar);
    const open = useSelector(state => state.ui.drawerOpen);

    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <img src={avatar} className={`${classes.avatar} ${open ? classes.avatarFull : classes.avatarShrink}`} />
        {open ? <Typography variant="subtitle2" style={{fontSize: 12, paddingLeft: 26, color: '#909090', fontWeight: 700}}>Channel</Typography> : null}
        <List>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}><DashboardIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} /> {/* https://material-ui.com/api/list-item/ */}
            </ListItem>
            <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}><VideosIcon /></ListItemIcon>
            <ListItemText primary={'Videos'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}><SettingsIcon /></ListItemIcon>
              <ListItemText primary={'Settings'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} />
            </ListItem>

        </List>
      </Drawer>
    );
}
