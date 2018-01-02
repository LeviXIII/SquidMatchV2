import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { TextField, RaisedButton } from 'material-ui';
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
                        autocomplete="off"
                        name="message" ref={input => this.myMessage = input}
            >
            </TextField>
            <section>
              <RaisedButton buttonStyle={sendButton}
                            fullWidth
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

    isLoggedIn: state.generalReducer.isLoggedIn,
    messages: state.generalReducer.messages,
  };
}

export default connect(mapStateToProps, actions)(Chat);