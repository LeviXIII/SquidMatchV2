import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Chat extends Component {
  
  render() {

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      
      <section className="container divBorder chatFormSettings">
        <h1 style={subTitle}>Chat</h1>

        <h3>Hello!</h3>
      </section>
    )
  }
}

//////////
//Styles//
//////////

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
  };
}

export default connect(mapStateToProps, actions)(Chat);