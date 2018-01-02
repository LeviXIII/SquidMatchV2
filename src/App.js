import React, { Component } from 'react';
import { Route, Switch, Link, 
        withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RaisedButton, Checkbox, Card,
          CardHeader, CardText, Avatar,
          Dialog, } from 'material-ui';
import axios from 'axios';
import io from 'socket.io-client';
import * as actions from './actions'

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';
import UpdateInfo from './components/UpdateInfo';
import SiteHeader from './components/SiteHeader';
import ChooseCriteria from './components/ChooseCriteria';
import Results from './components/Results';
import Chat from './components/Chat';

const socket = io('http://localhost:8080');

class App extends Component {
  
  componentDidMount() {
    
    socket.connect();
    
    socket.on('connect', () => {
      this.props.setSocket(socket);
    })

    socket.on('invited', () => {

      axios.get('/get-invite/' + this.props.username)
      .then(result => {
        this.props.getAccountInput({ name: 'from', value: result.data.from });
        this.props.getAccountInput({ name: 'notify', value: result.data.notify });

        //Modal pops for those receiving invites.
        if (this.props.notify) {
          this.props.setInviteModal(true);
        };
        
      })
      .catch(error => {
        console.log(error);
      })

    })

    socket.on('room-created', (data) => {
      //Set initial chat message.
      let chat = Array.from(this.props.messages);

      chat.push({ sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));
    })

    socket.on('joined-room', (data) => {
      //Set initial chat message.
      let chat = Array.from(this.props.messages);

      chat.push({ sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));
    })

    socket.on('update-chat', (data) => {
      //Update chat for everyone to see.
      let chat = Array.from(this.props.messages);

      chat.push({ sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));
    })
    
  }; //end componentDidMount

  acceptRequest = () => {
    this.props.setInviteModal(false);
    socket.emit('add-member', {
      username: this.props.username,
      from: this.props.from
    })

    //Clear out the invite once inside the room.
    axios.put('/clear-invite', {
      username: this.props.username,
      from: '',
      notify: false,
    })
    .then(results => {
      this.props.getAccountInput({ name: 'from', value: '' });
      this.props.getAccountInput({ name: 'notify', value: false });
    })
    .catch(error => {
      console.log(error);
    })
  }

  declineRequest = (clicked) => {
    this.props.setInviteModal(false);

    if (clicked) {
      axios.put('/clear-invite', {
        username: this.props.username,
        from: '',
        notify: false,
      })
      .then(results => {
        this.props.getAccountInput({ name: 'from', value: '' });
        this.props.getAccountInput({ name: 'notify', value: false });
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  //Check if the token is still valid.
  verifyToken = () => {
    axios.post('/verify-token', {
      currentToken: localStorage.getItem('token')
    })
    .then(result => {
      if (result.data.token === false) {
        this.props.setLoggedIn(false);
      }
    });
  }

  render() {

    //Buttons for Modal
    const actionButtons = [
      <RaisedButton buttonStyle={cancelButton}
                    backgroundColor='#ff43b7'
                    onClick={this.declineRequest}
      >
        Decline
      </RaisedButton>,
      <Link to="/chat">
        <RaisedButton buttonStyle={chatButton}
                    backgroundColor='#7aff42'
                    onClick={this.acceptRequest}
        >
          Booyah!
        </RaisedButton>
      </Link>
    ]

    return (
      <div className="mainBackground">
      {this.props.isLoggedIn && <SiteHeader />}
      <Switch>
        <Route path="/" exact render={() => 
          <LoginForm />} />
        <Route path="/account-info" exact render={() => 
          <AccountInfo />} />
        <Route path="/update-info" exact render={() => 
          <UpdateInfo verifyToken={this.verifyToken}/>} />
        <Route path="/choose-criteria" exact render={() => 
          <ChooseCriteria verifyToken={this.verifyToken}/>} />
        <Route path="/results" exact render={() => 
          <Results  socket={socket}
                    verifyToken={this.verifyToken}/>} />
        <Route path="/chat" exact render={() => 
          <Chat socket={socket}
                verifyToken={this.verifyToken}/>} />
      </Switch>

      <Dialog
          title={`Join ${this.props.from}'s Chat?`}
          titleStyle={subTitle}
          bodyStyle={dialogContent}
          actions={actionButtons}
          actionsContainerStyle={actionButtonStyle}
          modal={false}
          open={this.props.inviteModal}
          onRequestClose={(buttonClicked) => this.declineRequest(buttonClicked)}
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

    isLoggedIn: state.generalReducer.isLoggedIn,
    inviteModal: state.generalReducer.inviteModal,
    messages: state.generalReducer.messages,

    username: state.loginReducer.username,
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
