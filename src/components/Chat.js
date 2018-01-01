import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { TextField, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';

let chat;
let message = '';

class Chat extends Component {
  
  getMessage = (e) => {
    console.log(this.myMessage.input.value);
  }

  render() {

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
          <br />
        </section>
      );
    })    

    return (

      <section className="container divBorder chatFormSettings">
        <h1 style={subTitle}>Chat</h1>
        {chat}
        <span>
        <TextField placeholder="Type here"
                    name="message"
                    ref={input => this.myMessage = input}
        >
        </TextField>
        <RaisedButton overlayStyle={sendButton}
                      onClick={e => this.getMessage(e)}>
          Send
        </RaisedButton>
        </span>
        

      </section>
    )
  }

}

//////////
//Styles//
//////////

const sendButton = {
  width: '190px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const senderStyle = {
  fontFamily: 'paintball'
}

const messageStyle = {
  fontFamily: 'overpass'
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
    isLoggedIn: state.generalReducer.isLoggedIn,
    messages: state.generalReducer.messages,
  };
}

export default connect(mapStateToProps, actions)(Chat);