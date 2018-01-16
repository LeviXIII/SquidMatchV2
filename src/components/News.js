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
        <h1 style={subTitle}>Updates</h1>
        <ul>
          <li>
            Fixed bug that didn't log you out if you leave the page
            while chatting.
          </li>
          <li>
            Fixed bug that allowed for duplicate emails and usernames.
          </li>
          <li>
            Refreshing page fix and username/password recovery incoming.
          </li>
        </ul>
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
