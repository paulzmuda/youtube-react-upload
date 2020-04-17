import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  //
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div>footer content</div>
  );
};

Footer.displayName = 'components/Content/Dashboard/Footer';

export default Footer;
