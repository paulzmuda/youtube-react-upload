import 'react-hot-loader/patch';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';
import { ErrorReporter, deepForceUpdate } from './utils/devtools';
import AppRouter from './components/AppRouter';


let renderWithContainer = (Component: React.FC<any>) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

document.addEventListener('DOMContentLoaded', () => {
  renderWithContainer(AppRouter);
});

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./components/AppRouter', () => {
      const NextApp = require('./components/AppRouter').default; // eslint-disable-line global-require
      renderWithContainer(deepForceUpdate(NextApp));
    });
  }
  // Handle errors that might happen after rendering
  // Display the error in full-screen for development mode
  window.addEventListener('error', (event) => {
    renderWithContainer = () => {};
    document.title = `Runtime Error: ${event.error.message}`;
    render(
      <ErrorReporter error={event.error} />,
      document.getElementById('app'),
    );
  });
}
