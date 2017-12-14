import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';

class App extends Component {
  render() {
    return (
      <div className="mainBackground">
        <Route path="/" exact render={() => <LoginForm />} />
        <Route path="/account-info" exact render={() => <AccountInfo />} />
      </div>
    );
  }
}

export default App;
