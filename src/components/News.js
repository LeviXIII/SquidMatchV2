import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class News extends Component {

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <section className="container divBorder formSettings">
        <h1 style={subTitle}>Under Construction!</h1>
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
    username: state.loginReducer.username,

    isLoggedIn: state.generalReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, actions)(News);
