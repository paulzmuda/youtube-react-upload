import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { User as UserState } from './reducers/user';
import { UI as UIState } from './reducers/ui';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface Store {
  user: UserState,
  ui: UIState,
}

export default store;
