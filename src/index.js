import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ErrorReporter, deepForceUpdate } from './utils/devtools';
import AppRouter from './components/AppRouter';
import { AppContainer } from 'react-hot-loader';


let renderWithContainer = Component => {
  render(
      <AppContainer warnings={true}>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
    document.getElementById('app'),
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderWithContainer(AppRouter);
});


if (process.env.NODE_ENV == 'development') {
  if (module.hot) {
    module.hot.accept("./components/AppRouter", () => {
      const NextApp = require("./components/AppRouter").default;
      renderWithContainer(deepForceUpdate(NextApp));
    });
  }
  // Handle errors that might happen after rendering
  // Display the error in full-screen for development mode
    window.addEventListener('error', (event) => {
      renderWithContainer = null;
      document.title = `Runtime Error: ${event.error.message}`;
      render(<ErrorReporter error={event.error} />, document.getElementById('app'));
    });
}
