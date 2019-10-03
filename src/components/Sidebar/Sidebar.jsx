import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
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
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
        height: 108, 
        width: 108, 
        margin: '0 auto',
        marginBottom: 16,
        padding: 16,
        borderRadius: '50%', 
        overflow: 'hidden',
    },
    listItem: {
        '&:hover span, &:hover svg': {
            color: '#c4302b',
        }
    },
    primaryText: {
        color: '#626363',
        fontSize: 14,
    }
  }),
);

export default function Sidebar() {
    const classes = useStyles();
    const avatar = useSelector(state => state.user.avatar);
    return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <img src={avatar} className={classes.avatar} />
        <Typography variant="subtitle2" style={{fontSize: 12, paddingLeft: 18, color: '#909090', fontWeight: 700}}>Channel</Typography>
        <List>
            <ListItem button className={classes.listItem}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} /> {/* https://material-ui.com/api/list-item/ */}
            </ListItem>
            <ListItem button className={classes.listItem}>
            <ListItemIcon><VideosIcon /></ListItemIcon>
            <ListItemText primary={'Videos'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button className={classes.listItem}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary={'Settings'} primaryTypographyProps={{variant: 'body2'}} classes={{primary: classes.primaryText }} />
            </ListItem>

        </List>
      </Drawer>
    );
}

// to-do:
// mini variant drawer
// https://material-ui.com/components/drawers/#MiniDrawer.js