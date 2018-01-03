import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { TextField, RaisedButton } from 'material-ui';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

let chat;

class Chat extends Component {
  
  getMessage = (e) => {
    e.preventDefault();
    let message = Array.from(this.props.messages);
    
    //Start an event to display message to room.
    this.props.socket.emit('send-chat', {
      sender: this.props.username,
      message: this.myMessage.input.value,
    })

    this.props.setMessages(Array.from(message));
    this.myMessage.input.value = '';
  }

  leaveRoom = () => {
    this.props.socket.emit('leave-room', {
      username: this.props.username,
      from: this.props.from,
    })
    
    axios.put('/leave-chat', {
      username: this.props.username,
    })
    .then(result => {
      
    })
    .catch(error => {
      console.log(error);
    }) 

    this.props.getAccountInput({ name: 'status', value: 'Available' });
    this.props.getAccountInput({ name: 'from', value: '' });
    this.props.setChatting(false);
  }

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    let chat = this.props.messages.map((value, i) => {
      return (
        <section key={i}>
          <h3>
            <span style={senderStyle}>{value.sender}: </span>
            <span style={messageStyle}>{value.message}</span>
          </h3>
        </section>
      );
    })    

    return (
      <section>
        <section className="container divBorder chatFormSettings">
          <h1 style={subTitle}>Chat</h1>
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
              <Link to="/choose-criteria">
                <RaisedButton buttonStyle={cancelButton}
                            onClick={this.leaveRoom}
                >
                  Leave
                </RaisedButton>
              </Link>
              <RaisedButton buttonStyle={sendButton}
                            onClick={e => this.getMessage(e)}>
                Send
              </RaisedButton>
            </section>
          </form>
        </section>
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

const cancelButton = {
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const sendButton = {
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

    from: state.accountReducer.from,

    isLoggedIn: state.generalReducer.isLoggedIn,
    messages: state.generalReducer.messages,
  };
}

export default connect(mapStateToProps, actions)(Chat);