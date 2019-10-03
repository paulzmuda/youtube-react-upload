import React from "react";
import { withStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber, red } from "@material-ui/core/colors";

import Header from "./Header/Header";
import Sidebar from './Sidebar/Sidebar';
// import LoadingModal from "./LoadingModal";
// import ErrorDisplay from './Error';

import { connect } from 'react-redux';

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
		primary: { // primary : primary,
			main: '#c4302b', // '#00B8CD', // '#29b6f6',
		  },
		secondary: amber, //#039be5
		error: red
	},
	root: {
		// margin: "64px 0px 80px 0px",
		display: 'flex',
	},
	card: {
		marginBottom: 8
	}
});

const styles = theme => ({
	// https://reactjs.org/docs/dom-elements.html#style
  });

class App extends React.Component {
	goTo(route) {
		this.props.history.push(`${route}`);
	}

	constructor(props) {
		super(props);
		this.goTo = this.goTo.bind(this);
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				
					{/* <LoadingModal/> */}
					{/* <ErrorDisplay /> */}
					<Header goTo={this.goTo} match={this.props.match} />
					<Sidebar />
					{React.cloneElement(this.props.children, this.props)}
					{/* <SimpleSnackbar /> */}{" "}
					{/*<Footer goTo={this.goTo} pathname={this.props.location.pathname}/>*/}
			</MuiThemeProvider>
		);
	}
}

// export default App;
export default withStyles(styles)(App);
// export default connect()(withStyles(styles)(App));
// export default connect()(App);
