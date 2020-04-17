import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red } from '@material-ui/core/colors';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

// YouTube Colors
// https://www.youtube.com/about/brand-resources/#logos-icons-colors

// MUI Theming
// https://material-ui.com/customization/theming/#palette

const theme = createMuiTheme({
  typography: {
    fontFamily: 'YT Sans, Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#c4302b',
    },
    secondary: {
      main: '#0761D4',
    },
    error: red,
    background: {
      default: '#F4F4F4',
    },
  },
});

interface Props extends RouteComponentProps {
  children: React.ReactElement<any>
}

const App = ({
  history,
  location,
  children,
}: Props) => {
  const goTo = (route: string) => {
    history.push(route);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header goTo={goTo} />
      <Sidebar goTo={goTo} currentPath={location.pathname} />
      { children }
    </MuiThemeProvider>
  );
};

App.displayName = 'components/App';

export default App;
