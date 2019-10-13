import React from 'react';
import { __RouterContext } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useSpring, animated} from 'react-spring';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideosIcon from '@material-ui/icons/VideoLibrary';
import EventsIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 255;

const useStyles = makeStyles((theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: 'hidden',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
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
        height: 144,
        width: 144,
    },
    // avatarFull: {
      
    // },
    // avatarShrink: {
    //   height: 64,
    //   width: 64,
    //   [theme.breakpoints.up('sm')]: {  
    //     height: 76,
    //     width: 76,
    //   },
    // },
    listItem: {
        // '&:hover span, &:hover svg': {
        //     color: '#c4302b',
        // },
        height: 47
    },
    listItemIcon: {
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {  
        paddingLeft: 8,
      },
    },
    primaryText: {
        color: '#626363',
        fontSize: 14,
    },
    activeItem: {
      color: '#D90E19 !important',
      
    },
    activeBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      borderLeft: '4px solid #D90E19',
    },
  }),
);

export default function Sidebar(props) {
    const { location } = React.useContext(__RouterContext);
    const classes = useStyles();
    const avatar = useSelector(state => state.user.avatar);
    const open = useSelector(state => state.ui.drawerOpen);
    const [delayedClosed, setDelayedClosed] = React.useState(false);

    let avatarSpring = useSpring( // https://www.react-spring.io/docs/hooks/use-spring
      {
        from: { textAlign: 'center', width: drawerWidth },
        to: { opacity: open ? 1 : 0, top: open ? 100 : 0 },
        onFrame: (val) => {
          if(val.opacity < 0.2 && !open) {
            setDelayedClosed(false);
          }
          if(val.opacity > 0.1 && open) { // need to check if this is the first page load
            setDelayedClosed(true);
          }
        },
        config: { mass: 1, tension: 270, friction: 26 }
      }
    );

    let navigationSpring = useSpring(
      {
        from: { position: 'absolute', width: '100%', zIndex: 1000, top: 160 },
        to: { position: 'absolute', width: '100%', zIndex: 1000, top: (delayedClosed) ? 160 : 10 },
        config: { mass: 0.1, tension: 270, friction: 20 }
      }
    );

    // define navigation above the grey line
    const nav1 = [
      {
        route: '/dashboard',
        icon: <DashboardIcon />,
        name: 'Dashboard',
        current: function() { 
          return this.route === location.pathname;
        }
      },
      {
        route: '/videos',
        icon: <VideosIcon />,
        name: 'Videos',
        current: function() { 
          return this.route === location.pathname;
        }
      },
      {
        route: '/events',
        icon: <EventsIcon />,
        name: 'Events',
        current: function() { 
          return this.route === location.pathname;
        }
      }
    ];

    // define navigation below the grey line
    const nav2 = [
      {
        route: '/settings',
        icon: <SettingsIcon />,
        name: 'Settings',
        current: function() { 
          return this.route === location.pathname;
        }
      }
    ];

    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: delayedClosed,
          [classes.drawerClose]: !delayedClosed,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: delayedClosed,
            [classes.drawerClose]: !delayedClosed,
          }),
        }}
        open={(delayedClosed)}
      >
        
        <animated.div style={avatarSpring}>
          <div className={classes.toolbar} />
          <img src={avatar} className={classes.avatar} />
        </animated.div>

        <animated.div style={navigationSpring}>
          <div className={classes.toolbar} />
          {delayedClosed ? <Typography variant="subtitle2" style={{fontSize: 12, paddingLeft: 26, color: '#909090', fontWeight: 700}}>Channel</Typography> : null}

          <List>
            {
              nav1.map((item, i) => {
                const current = item.current();
                let listItem = classes.listItem;
                let listItemIcon = classes.listItemIcon;
                let primaryText = classes.primaryText;
                if(current) {
                  listItem = `${listItem} ${classes.activeBackground}`;
                  listItemIcon = `${listItemIcon} ${classes.activeItem}`;
                  primaryText = `${primaryText} ${classes.activeItem}`;
                }
                return (
                  <ListItem button className={listItem} onClick={e => props.goTo(item.route)} key={1+i}>
                    <ListItemIcon className={`${listItemIcon}`}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} primaryTypographyProps={{variant: 'body2'}} classes={{primary: primaryText}} /> {/* https://material-ui.com/api/list-item/ */}
                  </ListItem>
                )
              })
            }
          </List>
          <Divider />
          <List>
          {
              nav2.map((item, i) => {
                const current = item.current();
                let listItem = classes.listItem;
                let listItemIcon = classes.listItemIcon;
                let primaryText = classes.primaryText;
                if(current) {
                  listItem = `${listItem} ${classes.activeBackground}`;
                  listItemIcon = `${listItemIcon} ${classes.activeItem}`;
                  primaryText = `${primaryText} ${classes.activeItem}`;
                }
                return (
                  <ListItem button className={classes.listItem} onClick={e => props.goTo(item.route)} key={2+i}>
                    <ListItemIcon className={`${listItemIcon}`}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} primaryTypographyProps={{variant: 'body2'}} classes={{primary: primaryText}} /> {/* https://material-ui.com/api/list-item/ */}
                  </ListItem>
                )
              })
            }
          </List>
        </animated.div>
      </Drawer>
    );
}
