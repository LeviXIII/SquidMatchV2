import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
