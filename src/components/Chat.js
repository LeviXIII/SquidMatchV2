import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { TextField, RaisedButton, Dialog } from 'material-ui';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

let chat;

class Chat extends Component {
  
  closeNewSearchModal = () => {
    this.props.setNewSearchModal(false);
  }

  getMessage = (e) => {
    e.preventDefault();

    //Prevents user from inputting blank values.
    if (this.myMessage.input.value !== '') {
      let message = Array.from(this.props.messages);
      
      //Start an event to display message to room.
      this.props.socket.emit('send-chat', {
        sender: this.props.username,
        message: this.myMessage.input.value,
        from: this.props.from,
      })

      this.props.setMessages(Array.from(message));
      this.myMessage.input.value = '';

    }
  }

  leaveRoom = () => {
    //Close the room if the room leader is leaving.
    if (this.props.username === this.props.from) {
      this.props.socket.emit('close-room', {
        username: this.props.username,
        from: this.props.from,
      })
    }
    else {
      this.props.socket.emit('leave-room', {
        username: this.props.username,
        from: this.props.from,
      })
    }
    
    axios.put('/leave-chat', {
      username: this.props.username,
    })
    .then(result => {
      this.props.getAccountInput({ name: 'status', value: 'Available' });
      this.props.getAccountInput({ name: 'from', value: '' });
      this.props.setChatting(false);
      this.props.setMessages([]);
    })
    .catch(error => {
      console.log(error);
    }) 
  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    if (this.props.emptyRoom) {
      return <Redirect to="/choose-criteria" />
    }

    let chat = this.props.messages.map((value, i) => {
      return (
        <section key={i}>
          <h4>
            <span style={senderStyle}>{value.sender}: </span>
            <span style={messageStyle}>{value.message}</span>
          </h4>
        </section>
      );
    })    

    const searchModalButtons = [
      <Link to="/choose-criteria">
        <RaisedButton buttonStyle={sendButton}
                    onClick={this.closeNewSearchModal}
        >
          Search
        </RaisedButton>
      </Link>
    ]

    return (
      <section>
        <section className="container divBorder chatFormSettings">
          <h1 style={subTitle}>Chat</h1>
          <p style={NSIDstyle}>NSID: {this.props.NSID}</p>
          {chat}
        </section>  
        <section className="container divBorder chatFormSettings">
          <form onSubmit={e => this.getMessage(e)}>
            <TextField fullWidth placeholder="Type here"
                        autoComplete="off"
                        name="message" ref={input => this.myMessage = input}
            >
            </TextField>
            <section className="gridSelector">
            {this.props.username === this.props.from ? (
              <Link to="/choose-criteria">
                <RaisedButton buttonStyle={leaveButton}
                            onClick={this.leaveRoom}
                >
                  Close Room
                </RaisedButton>
              </Link>
            ) : (
              <Link to="/choose-criteria">
                <RaisedButton buttonStyle={leaveButton}
                            onClick={this.leaveRoom}
                >
                  Leave
                </RaisedButton>
              </Link>
            )}
              
              <RaisedButton buttonStyle={sendButton}
                            onClick={e => this.getMessage(e)}>
                Send
              </RaisedButton>
            </section>
          </form>
        </section>

        { /* New Search Modal */ }
        <Dialog
            title="Ouch..."
            titleStyle={subTitle}
            actions={searchModalButtons}
            actionsContainerStyle={searchModalStyle}
            bodyStyle={dialogContent}
            modal={false}
            open={this.props.newSearchModal}
            onRequestClose={this.closeNewSearchModal}
        >
          1 or more members have received invites already. Please search again.
        </Dialog>

      </section> 
    )
  }

}

//////////
//Styles//
//////////

const messageStyle = {
  fontFamily: 'overpass'
}

const NSIDstyle = {
  fontFamily: 'overpass',
  textAlign: 'center'
}

const leaveButton = {
  width: '15vh',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const dialogContent = {
  fontFamily: 'overpass',
  fontSize: '1.3rem',
  textAlign: 'center',
  color: 'red',
}

const searchModalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '20px'
}

const sendButton = {
  width: '15vh',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const senderStyle = {
  fontFamily: 'paintball'
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
    username: state.loginReducer.username,

    NSID: state.accountReducer.NSID,
    from: state.accountReducer.from,
    
    newSearchModal: state.searchReducer.newSearchModal,

    isLoggedIn: state.generalReducer.isLoggedIn,
    messages: state.generalReducer.messages,
    emptyRoom: state.generalReducer.emptyRoom,
  };
}

export default connect(mapStateToProps, actions)(Chat);