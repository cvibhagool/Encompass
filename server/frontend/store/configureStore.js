import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import routes from '../routes';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    reduxReactRouter({ routes, createHistory })
  )(createStore);


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

export function configureServerStore(initialState) {
  const finalCreateServerStore = compose(
    applyMiddleware(thunk),
    //Need to fix line below; throws error if createHistory isn't below; if
    //used on the server, throws error relating to lack of a DOM
    reduxReactRouter({ routes, createHistory: createMemoryHistory })
  )(createStore);

  return finalCreateServerStore(rootReducer, initialState);
}
