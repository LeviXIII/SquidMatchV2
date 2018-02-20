import React, { Component } from 'react';
import { Route, Switch, Link, 
        withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RaisedButton, Dialog, Snackbar } from 'material-ui';
import axios from 'axios';
import io from 'socket.io-client';
import * as actions from './actions';

import LoginForm from './components/LoginForm';
import AccountInfo from './components/AccountInfo';
import UpdateInfo from './components/UpdateInfo';
import SiteHeader from './components/SiteHeader';
import ChooseCriteria from './components/ChooseCriteria';
import Results from './components/Results';
import Chat from './components/Chat';
import FriendList from './components/FriendList';
import News from './components/News';

const socket = io('http://localhost:8080');
// const socket = io('https://squidmatch.herokuapp.com/', {
//   transports: ['websocket']
// });

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

      chat.push({ time: data.time, sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));
    })

    socket.on('joined-room', (data) => {
      //Set initial chat message.
      let chat = Array.from(this.props.messages);

      chat.push({ time: data.time, sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));

      axios.post('/open-new-conversation', {
        roomMembers: data.roomMembers
      })
      .then(result => {

      })
      .catch(error => {
        console.log("Open New Conversation Error: " + error);
      })
    })

    socket.on('retrieve-old-messages', (data) => {
      //Retrieve previous messages.
      axios.post('/get-messages', {
        roomMembers: data.roomMembers,
      })
      .then(result => {
        if (result.data.messages !== null) {
          let oldMessages = Array.from(this.props.messages);
          this.props.setMessages(oldMessages.concat(result.data.messages.messages));
        }
      })
      .catch(error => {
        console.log("Get Messages Error: " + error);
      })
    })

    socket.on('update-chat', (data) => {
      //Update chat for everyone to see.
      let chat = Array.from(this.props.messages);

      chat.push({ time: data.time, sender: data.sender, message: data.message })
      this.props.setMessages(Array.from(chat));
    })

    socket.on('update-save-chat', (data) => {
      axios.put('/save-chat', {
        roomMembers: data.roomMembers,
        time: data.time,
        sender: data.sender,
        message: data.message,
      })
      .then(result => {
        
      })
      .catch(error => {
        console.log("Save Chat Error: " + error);
      })
    })

    socket.on('remnant-room', (data) => {
      axios.post('/open-new-conversation', {
        roomMembers: data.roomMembers
      })
      .then(result => {
        this.props.setMessages([]);
      })
      .catch(error => {
        console.log("Open New Conversation Error: " + error);
      })
    })

    socket.on('room-closed', (data) => {
      axios.put('/leave-chat', {
        username: this.props.username,
      })
      .then(result => {
        this.props.getAccountInput({ name: 'status', value: 'Available' });
        this.props.getAccountInput({ name: 'from', value: '' });
        this.props.setChatting(false);
        this.props.setEmptyRoom(data.emptyRoom);
        this.props.setMessages([]);
      })
      .catch(error => {
        console.log(error);
      })
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
      notify: false,
      from: this.props.from,
      status: 'Busy',
    })
    .then(results => {
      this.props.getAccountInput({ name: 'from', value: this.props.from });
      this.props.getAccountInput({ name: 'notify', value: false });
      this.props.getAccountInput({ name: 'status', value: 'Busy' });
      this.props.setChatting(true);
    })
    .catch(error => {
      console.log(error);
    })
  }

  declineRequest = (clicked) => {
    this.props.setInviteModal(false);

    if (clicked) {
      socket.emit('declined-invite', {
        username: this.props.username,
        from: this.props.from
      })

      axios.put('/clear-invite', {
        username: this.props.username,
        notify: false,
        from: '',
        status: this.props.status,
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

  closeUpdateModal = () => {
    this.props.setUpdateModal(false);
  }

  closeEmptyMessage = () => {
    this.props.setEmptyRoom(false);
  }

  logout = () => {
    axios.put('/logout', {
      username: this.props.username     
    })
    .then(result => {
      
    })
    .catch(error => {
      console.log(error);
    })

    this.props.setLoggedIn(false);
    localStorage.removeItem('token');
    //socket.disconnect();
    this.props.setInitialAccountState();
    this.props.setInitialLoginState();
    this.props.setInitialSearchState();
    this.props.setInitialGeneralState();
  }

  //Check if the token is still valid.
  verifyToken = () => {
    axios.post('/verify-token', {
      currentToken: localStorage.getItem('token')
    })
    .then(result => {
      if (result.data.token === false) {
        this.logout();
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
      <section className="mainBackground">
        {this.props.isLoggedIn && <SiteHeader logout={this.logout}/>}
        <Switch>
          <Route path="/" exact render={() => 
            <LoginForm logout={this.logout}/>} />
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
          <Route path="/friend-list" exact render={() => 
            <FriendList socket={socket}
                        verifyToken={this.verifyToken}/>} />
          <Route path="/news" exact render={() => 
            <News socket={socket}
                  verifyToken={this.verifyToken}/>} />
        </Switch>

        { /* Invite Modal */ }
        <Dialog
            title={`Join ${this.props.from}'s Chat?`}
            titleStyle={subTitle}
            actions={actionButtons}
            actionsContainerStyle={actionButtonStyle}
            modal={false}
            open={this.props.inviteModal}
            onRequestClose={(buttonClicked) => this.declineRequest(buttonClicked)}
        >
        </Dialog>

        { /* Update Message */ }
        <Snackbar
          open={this.props.updateModal}
          message="Profile Updated"
          autoHideDuration={3000}
          contentStyle={dialogContent}
          onRequestClose={this.closeUpdateModal}
        />

        { /* Room Closed Message */ }
        <Snackbar
          open={this.props.emptyRoom}
          message="Squad leader closed the room."
          autoHideDuration={5000}
          contentStyle={dialogContent}
          onRequestClose={this.closeEmptyMessage}
        />
      </section>
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
  fontSize: '1rem',
  textAlign: 'center',
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
    status: state.accountReducer.status,

    isLoggedIn: state.generalReducer.isLoggedIn,
    updateModal: state.generalReducer.updateModal,
    inviteModal: state.generalReducer.inviteModal,
    emptyRoom: state.generalReducer.emptyRoom,
    messages: state.generalReducer.messages,

    username: state.loginReducer.username,
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
