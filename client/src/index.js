import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const reduxStore = configureStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);

serviceWorker.unregister();
