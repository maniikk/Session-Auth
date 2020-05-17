import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import { checkLoggedIn } from './util/session';
const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router> 
    </Provider>,
    document.getElementById('root')
  );
  window.getState = store.getState
}

(async () => renderApp(await checkLoggedIn()))();
