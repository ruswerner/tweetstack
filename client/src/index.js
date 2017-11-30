import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import ConnectedApp from './components/ConnectedApp';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import tweetStackApp from './reducers';
import {configureMoment} from './utils';
import persistState from './middleware/persist-state';

configureMoment();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  tweetStackApp,
  composeEnhancers(applyMiddleware(thunk, persistState))
);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
