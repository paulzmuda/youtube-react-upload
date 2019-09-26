import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber, grey, blue, red } from "@material-ui/core/colors";
// import Header from "./Header/Header"; // import Footer from './Footer/Footer';  // import Button from 'material-ui/Button'; // import SimpleSnackbar from './SimpleSnackbar';
// import LoadingModal from "./LoadingModal";
// import ErrorDisplay from './Error';

import { connect } from 'react-redux';
// import { initAllCarriers } from '../actions/actionCreators';

// const primary = blue["0D47A1"]; // #00B8CD // lightBlue[400]??
const theme = createMuiTheme({
	// https://material-ui-next.com/customization/themes/#palette
	// https://material-ui.com/style/color/
	// https://material-ui-next.com/style/color/
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: { // primary : primary,
			main: '#039be5', // '#00B8CD', // '#29b6f6',
		  },
		secondary: amber,
		error: red
	},
	root: {
		// margin: "64px 0px 80px 0px",
		// flexGrow: 1
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

	componentWillMount() {
		// this.props.dispatch(initAllCarriers());
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				
					{/* <LoadingModal/> */}
					{/* <ErrorDisplay /> */}
					{/* <Header goTo={this.goTo} match={this.props.match} /> */}
					{React.cloneElement(this.props.children, this.props)}
					{/* <SimpleSnackbar /> */}{" "}
					{/*<Footer goTo={this.goTo} pathname={this.props.location.pathname}/>*/}
					
			</MuiThemeProvider>
		);
	}
}

// export default App;
// export default withStyles(styles)(App);
export default connect()(withStyles(styles)(App));
// export default connect()(App);
