import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RaisedButton, Checkbox, Card,
          CardHeader, CardText, Avatar,
          Dialog, } from 'material-ui';
import * as actions from './actions'

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';
import SiteHeader from './components/SiteHeader';
import ChooseCriteria from './components/ChooseCriteria';
import Results from './components/Results';
import Chat from './components/Chat';

class App extends Component {
  
  closeModal = () => {
    this.props.getAccountInput({ notify: false });
  }
  
  render() {

    //Buttons for Modal
    const actionButtons = [
      <RaisedButton buttonStyle={cancelButton}
                    backgroundColor='#ff43b7'
                    onClick={this.closeModal}>
        Cancel
      </RaisedButton>,
      // <Link to="/chat">
        <RaisedButton buttonStyle={chatButton}
                    backgroundColor='#7aff42'
        >
          Chat
        </RaisedButton>
      // </Link>
    ]

    return (
      <div className="mainBackground">
      {this.props.isLoggedIn && <SiteHeader />}
      <Switch>
        <Route path="/" exact render={() => <LoginForm />} />
        <Route path="/account-info" exact render={() => <AccountInfo />} />
        <Route path="/choose-criteria" exact render={() => <ChooseCriteria />} />
        <Route path="/results" exact render={() => <Results />} />
        <Route path="/chat" exact render={() => <Chat />} />
      </Switch>

      <Dialog
          title={`Join ${this.props.from}'s Chat?`}
          titleStyle={subTitle}
          bodyStyle={dialogContent}
          actions={actionButtons}
          actionsContainerStyle={actionButtonStyle}
          modal={false}
          open={this.props.notify}
          onRequestClose={this.closeModal}
      >
      </Dialog>
      </div>
    );
  }
}

//////////
//Styles//
//////////

const actionButtonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingBottom: '20px'
}

const cancelButton = {
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const chatButton = {
  width: '100px',
  fontFamily: 'paintball',
  color: 'black',
}

const dialogContent = {
  fontFamily: 'overpass',
  fontSize: '1.3rem',
  textAlign: 'center',
  color: 'red',
}

const subTitle =  {
  fontFamily: 'paintball',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
}

const mapStateToProps = (state) => {
  return {
    from: state.accountReducer.from,
    notify: state.accountReducer.notify,

    isLoggedIn: state.generalReducer.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
