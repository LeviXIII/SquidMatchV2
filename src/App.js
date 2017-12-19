import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';
import SiteHeader from './components/SiteHeader';
import ChooseCriteria from './components/ChooseCriteria';

class App extends Component {
  render() {
    return (
      <div className="mainBackground">
      {this.props.isLoggedIn && <SiteHeader />}
      <Switch>
        <Route path="/" exact render={() => <LoginForm />} />
        <Route path="/account-info" exact render={() => <AccountInfo />} />
        <Route path="/choose-criteria" exact render={() => <ChooseCriteria />} />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.generalReducer.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps)(App));
