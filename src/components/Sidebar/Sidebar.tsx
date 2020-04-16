import React from 'react';
import { Store } from '../../store';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  nav,
  subNav,
} from './';
import MenuItems from './MenuItems';

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
  })
);

interface Props {
  goTo: Function
  currentPath: string
}

export default function Sidebar({
  goTo,
  currentPath,
}: Props) {
  const classes = useStyles();
  const avatar = useSelector(({ user }: Store) => user.avatar);
  const open = useSelector(({ ui }: Store) => ui.drawerOpen);
  const [delayedClosed, setDelayedClosed] = React.useState(false);

  // https://www.react-spring.io/docs/hooks/use-spring
  const avatarSpring = useSpring<any>(
    {
      from: { textAlign: 'center', width: drawerWidth },
      to: { opacity: open ? 1 : 0, top: open ? 100 : 0 },
      onFrame: (val: any) => {
        if (val.opacity < 0.2 && !open) {
          setDelayedClosed(false);
        }
        if (val.opacity > 0.1 && open) {
          // need to check if this is the first page load
          setDelayedClosed(true);
        }
      },
      config: { mass: 1, tension: 270, friction: 26 },
    }
  );

  const navigationSpring = useSpring({
    from: { position: 'absolute', width: '100%', zIndex: 1000, top: 160 },
    to: {
      position: 'absolute',
      width: '100%',
      zIndex: 1000,
      top: delayedClosed ? 160 : 10,
    },
    config: { mass: 0.1, tension: 270, friction: 20 },
  });

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
      open={delayedClosed}
    >
      <animated.div style={avatarSpring}>
        <div className={classes.toolbar} />
        <img src={avatar} className={classes.avatar} />
      </animated.div>

      <animated.div style={navigationSpring}>
        <div className={classes.toolbar} />
        {
          delayedClosed ? (
            <Typography
              variant="subtitle2"
              style={{
                fontSize: 12,
                paddingLeft: 26,
                color: '#909090',
                fontWeight: 700,
              }}
            >
              Channel
            </Typography>
          ) : null
        }
        <MenuItems items={nav} goTo={goTo} currentPath={currentPath} />
        <Divider />
        <MenuItems items={subNav} goTo={goTo} currentPath={currentPath} />
      </animated.div>
    </Drawer>
  );
}
