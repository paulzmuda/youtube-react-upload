import React from 'react';
import { Store } from '../../store';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    position: 'relative',
    top: theme.mixins.toolbar.minHeight,
    width: '100%',
    height: '100%',
    padding: 0,
  },
}));

interface Props {
  children: React.ReactElement<any>
}

export default (props: Props) => {
  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm')); // https://material-ui.com/components/use-media-query/
  const themeSpacing = mobile ? theme.spacing(7) + 1 : theme.spacing(9) + 1;
  const classes = useStyles();
  const ui = useSelector(({ ui }: Store) => ui);
  
  // https://www.react-spring.io/docs/hooks/use-spring
  const style = useSpring({
    config: { mass: 1.5, tension: 120, friction: 26 },
    from: { paddingLeft: ui.drawerOpen ? 255 : themeSpacing, opacity: 0 },
    to: { paddingLeft: ui.drawerOpen ? 255 : themeSpacing, opacity: 1 },
  });

  return (
    <animated.div className={classes.pageContainer} style={style}>
      {props.children}
    </animated.div>
  );
};
