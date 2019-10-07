import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from 'react-redux';
import {useSpring, animated} from 'react-spring';

const useStyles = makeStyles(theme => ({
    pageContainer: {
      position: 'absolute',
      top: theme.mixins.toolbar.minHeight,
      width: '100vh',
      height: '100vh',
    },
}));

export default (props) => {
  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm')); // https://material-ui.com/components/use-media-query/
  const themeSpacing = mobile ? theme.spacing(7) + 1 : theme.spacing(9) + 1;
  const classes = useStyles();
  const ui = useSelector(state => state.ui);
  let style = useSpring({left: ui.drawerOpen ? 240 : themeSpacing}); // https://www.react-spring.io/docs/hooks/use-spring

  return (
    <animated.div className={classes.pageContainer} style={style}>
        {props.children}
    </animated.div>
  );
}
