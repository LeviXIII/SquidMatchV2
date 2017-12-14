import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';

import { connect } from 'react-redux';
import * as actions from '../actions';

import squidIcon from '../images/squidIcon.png';
import passwordIcon from '../images/passwordIcon.png';

class LoginForm extends Component {
  
  getUsername = (e) => {
    this.props.getUsername(e.target.value.replace(/ /g, ""));
  }

  getPassword = (e) => {
    this.props.getPassword(e.target.value.replace(/ /g, ""));
  }

  getVerifyPassword = (e) => {
    this.props.getVerifyPassword(e.target.value.replace(/ /g, ""));
  }

  showCreateButton = (e) => {
    e.preventDefault();
    this.props.showCreateButton(true);
  }

  userLogin = (e) => {
    e.preventDefault();
  }

  setupAccount = (e) => {
    e.preventDefault();
  }

  render() {

    let showLoginButton = <Button style={loginButton} waves='light'>Login</Button>;
    let showSignupButton = <Button style={signupButton} waves='light'
                              onClick={e => this.showCreateButton(e)}>
                              Sign Up
                            </Button>
    let showCreateAccount = <Button style={signupButton} waves='light'
                              onClick={e => this.setupAccount(e)}>
                              Create Account
                            </Button>

    return (
      <form className="col s12 container divBorder formSettings">
        <h1 className="siteTitle">Squid Match</h1>
        <h4 style={subTitle}>Login to find active players to play with</h4>
          <div className="row">

            <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="username-icon" src={squidIcon}/>
	          <Input s={8} m={9} l={9} label="Username" validate
                    value={this.props.username}
                    onChange={e => this.getUsername(e)}>
            </Input>
      
            <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="password-icon" src={passwordIcon}/>
            <Input s={8} m={9} l={9} type="password" label="Password" validate
                    value={this.props.password}
                    onChange={e => this.getPassword(e)}>
            </Input>

            {this.props.createButton &&
            <div>
              <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                    alt="password-icon" src={passwordIcon}/>
              <Input s={8} m={9} l={9} type="password" label="Password" validate
                      value={this.props.verifyPassword}
                      onChange={e => this.getVerifyPassword(e)}>
              </Input>
            </div>
            }

            <section className="center-align">
              {this.props.createButton ? showCreateAccount : showLoginButton}
              <br />
              <br />
            </section>

            <section className="center-align">
            {this.props.createButton ? showLoginButton : showSignupButton}
            </section>

          </div>
      </form>
    )
  }

}

//////////
//Styles//
//////////

const secondOption = {
  fontFamily: 'overpass',
}

const signupButton = {
  width: '185px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const loginButton = {
  width: '185px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const subTitle =  {
  fontFamily: 'overpass',
  textAlign: 'center',
  color: '#948f8f',
  marginTop: '1%'
}

const mapStateToPrps = (state) => {
  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    verifyPassword: state.loginReducer.verifyPassword,
    createButton: state.loginReducer.createButton,
  }
}

export default connect(mapStateToPrps, actions)(LoginForm);