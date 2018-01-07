import React, { Component } from 'react';
import { RaisedButton, Checkbox, Card,
        CardHeader, CardText, CardActions,
        Avatar, Dialog, IconButton,
        Snackbar, } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import background from '../images/cardPaintBackground.jpg'

class FriendList extends Component {

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <h1>FRIENDS!</h1>
    )
  }

}

//////////
//Styles//
//////////

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,

    isLoggedIn: state.generalReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, actions)(FriendList);