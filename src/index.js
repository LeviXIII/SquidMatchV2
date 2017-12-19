import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <MuiThemeProvider>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>
  , 
  document.getElementById('root')
);
registerServiceWorker();
