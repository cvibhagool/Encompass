import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const finalCreateServerStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureServerStore(initialState) {
  return finalCreateServerStore(rootReducer, initialState);
}
