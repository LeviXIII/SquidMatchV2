import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import squidIcon from '../images/squidIcon.png';
import passwordIcon from '../images/passwordIcon.png';

class LoginForm extends Component {

  showCreateButton = (e) => {
    e.preventDefault();
    this.props.showCreateButton(true);
  }

  userLogin = (e) => {
    e.preventDefault();
  }

  setupAccount = (e) => {
    e.preventDefault();
    if (this.props.password === this.props.verifyPassword &&
      this.props.password.length >= 8) {
      this.props.getMatchingPassword(true);
    }
    else {
      this.props.setVerifyMessage("Your password doesn't match or is too short.")
    }
  }

  render() {

    //If passwords match for creating account, go to next page.
    if (this.props.matchingPassword) {
     return <Redirect to="/account-info" />
    }

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
	          <Input s={8} m={9} l={9} label="username" validate
                    name="username" value={this.props.username}
                    onChange={e => this.props.getLoginInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })}>
            </Input>
      
            <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                  alt="password-icon" src={passwordIcon}/>
            <Input s={8} m={9} l={9} type="password" label="Password" validate
                    name="password" value={this.props.password}
                    onChange={e => this.props.getLoginInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })}>
            </Input>

            {this.props.createButton &&
            <div>
              <img className="col s2 m1 l1 offset-s1 offset-m1 offset-l1 responsive-img displayIcon"
                    alt="password-icon" src={passwordIcon}/>
              <Input style={passwordField} s={8} m={9} l={9} type="password" label="Password" validate
                      name="verifyPassword" value={this.props.verifyPassword}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </Input>
            </div>
            }

          </div>
          <div>
            <section className="center-align">
              <p style={messageStyle}>{this.props.verifyMessage}</p>
            </section>

            <section className="center-align">
              {this.props.createButton ? showCreateAccount : showLoginButton}
              <br />
              <br />
            </section>

            <section className="center-align">
            {this.props.createButton ? showLoginButton : showSignupButton}
            </section>
            <br />
          </div>
          
      </form>
    )
  }

}

//////////
//Styles//
//////////

const messageStyle = {
  fontFamily: 'overpass',
  fontSize: '1.2rem',
  textAlign: 'center',
  color: 'red',
  marginTop: '1%',
  marginBottom: '2%',
}

const signupButton = {
  width: '190px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
  color: 'black',
}

const loginButton = {
  width: '190px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
  color: 'black',
}

const subTitle =  {
  fontFamily: 'overpass',
  textAlign: 'center',
  color: '#948f8f',
  marginTop: '1%',
  marginBottom: '1%',
}

const passwordField = {
  marginBottom: '0%',
}

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    verifyPassword: state.loginReducer.verifyPassword,
    verifyMessage: state.loginReducer.verifyMessage,
    createButton: state.loginReducer.createButton,
    matchingPassword: state.loginReducer.matchingPassword,
  }
}

export default connect(mapStateToProps, actions)(LoginForm);