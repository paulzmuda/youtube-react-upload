import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, grey } from "@material-ui/core/colors";
import Header from "./Header/Header";
import Sidebar from './Sidebar/Sidebar';

// import LoadingModal from "./LoadingModal";
// import ErrorDisplay from './Error';

// YouTube Colors
// https://www.youtube.com/about/brand-resources/#logos-icons-colors

// MUI Theming
// https://material-ui.com/customization/theming/#palette

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			main: '#c4302b',
		  },
		secondary: grey,
		error: red,
		background: {
			default: '#F4F4F4'
		}
	},
	root: {
		display: 'flex',
	},
	card: {
		marginBottom: 8
	},
});

export default (props) => {
	const goTo = (route) => {
		props.history.push(`${route}`);
	}
	
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{/* <LoadingModal/> */}
			{/* <ErrorDisplay /> */}
			<Header goTo={goTo} match={props.match} />
			<Sidebar goTo={goTo} {...props} />
			{React.cloneElement(props.children, props)}
			{/* <SimpleSnackbar /> */}{" "}
			{/*<Footer goTo={this.goTo} pathname={this.props.location.pathname}/>*/}
		</MuiThemeProvider>
	);
}
