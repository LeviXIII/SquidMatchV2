import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';

class App extends Component {
  render() {
    return (
      <div className="mainBackground">
      {/* <Switch> */}
        <Route path="/" exact render={() => <LoginForm />} />
        <Route path="/account-info" exact render={() => <AccountInfo />} />
      {/* </Switch> */}
      </div>
    );
  }
}

export default App;
