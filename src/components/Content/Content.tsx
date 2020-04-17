import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSpring, animated } from 'react-spring';
import { Store } from '../../store';
import ContentLoading from './ContentLoading';


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
  children: React.ReactNode
}

const Content = ({ children }: Props) => {
  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const themeSpacing = mobile ? theme.spacing(7) + 1 : theme.spacing(9) + 1;
  const classes = useStyles();
  const uiData = useSelector(({ ui }: Store) => ui);

  const style = useSpring({
    config: { mass: 1.5, tension: 120, friction: 26 },
    from: { paddingLeft: uiData.drawerOpen ? 255 : themeSpacing, opacity: 0 },
    to: { paddingLeft: uiData.drawerOpen ? 255 : themeSpacing, opacity: 1 },
  });

  return (
    <animated.div className={classes.pageContainer} style={style}>
      { children }
    </animated.div>
  );
};

Content.displayName = 'components/Content/Content';

export default Content;
