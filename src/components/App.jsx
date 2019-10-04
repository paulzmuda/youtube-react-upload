import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import { amber, red } from "@material-ui/core/colors";

import Header from "./Header/Header";
import Sidebar from './Sidebar/Sidebar';
// import LoadingModal from "./LoadingModal";
// import ErrorDisplay from './Error';

// YouTube Colors
// https://www.youtube.com/about/brand-resources/#logos-icons-colors

// MUI Color Docs
// https://material-ui-next.com/customization/themes/#palette
// https://material-ui.com/style/color/
// https://material-ui-next.com/style/color/

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			main: '#c4302b',
		  },
		secondary: amber,
		error: red
	},
	root: {
		display: 'flex',
	},
	card: {
		marginBottom: 8
	}
});

const styles = theme => ({
	// https://reactjs.org/docs/dom-elements.html#style
  });

const App = (props) => {
	const goTo = (route) => {
		props.history.push(`${route}`);
	}
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{/* <LoadingModal/> */}
			{/* <ErrorDisplay /> */}
			<Header goTo={goTo} match={props.match} />
			<Sidebar />
			{React.cloneElement(props.children, props)}
			{/* <SimpleSnackbar /> */}{" "}
			{/*<Footer goTo={this.goTo} pathname={this.props.location.pathname}/>*/}
		</MuiThemeProvider>
	);
}

export default withStyles(styles)(App);
