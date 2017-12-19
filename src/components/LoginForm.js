import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
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
    if (this.props.username !== '') {
      if (this.props.password === this.props.verifyPassword &&
        this.props.password.length >= 8) {
        this.props.setMatchingPassword(true);
      }
      else {
        this.props.setVerifyMessage("Your password doesn't match or is too short.");
      }
    }
    else {
      this.props.setVerifyMessage("Please enter a username.") 
    }
  }

  render() {

    //If passwords match for creating account, go to next page.
    if (this.props.matchingPassword) {
      return <Redirect to="/account-info" />
    }

    let showLoginButton = <RaisedButton overlayStyle={loginButton}>Login</RaisedButton>;
    let showSignupButton = <RaisedButton overlayStyle={signupButton}
                              onClick={e => this.showCreateButton(e)}>
                              Sign Up
                            </RaisedButton>
    let showCreateAccount = <RaisedButton overlayStyle={signupButton}
                              onClick={e => this.setupAccount(e)}>
                              Create Account
                            </RaisedButton>

    return (
      <section className="container divBorder formSettings">
        <h1 className="siteTitle">Squid Match</h1>
        <h4 style={subTitle}>Login to find active players to play with</h4>
            <section className="grid">
              <section className="imgContainer">
                <img className="displayIcon" alt="username-icon" src={squidIcon}/>
              </section>
              <TextField style={fieldWidth} floatingLabelText="Username" floatingLabelFixed
                      name="username" value={this.props.username}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </TextField>
            </section>
        
            <section className="grid">
              <section className="imgContainer">
                <img className="displayIcon" alt="password-icon" src={passwordIcon}/>
              </section>
              <TextField style={fieldWidth} type="password" floatingLabelText="Password"
                      floatingLabelFixed name="password" value={this.props.password}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </TextField>
            </section>

            {this.props.createButton &&
            <section className="grid">
              <section className="imgContainer">
                <img className="displayIcon" alt="password-icon" src={passwordIcon}/>
              </section>  
              <TextField style={fieldWidth} type="password" floatingLabelText="Verify Password"
                      floatingLabelFixed name="verifyPassword" value={this.props.verifyPassword}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </TextField>
            </section>
            }

            <section className="grid">
              <p style={messageStyle}>{this.props.verifyMessage}</p>
            </section>

            <section className="grid">
                {this.props.createButton ? showCreateAccount : showLoginButton}
            </section>
            <br />

            <section className="grid">
              {this.props.createButton ? showLoginButton : showSignupButton}
            </section>
            <br />
          
      </section>
    )
  }

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

//////////
//Styles//
//////////

const fieldWidth = {
  width: '75%'
}

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
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#464547',
  marginTop: '1%',
  marginBottom: '1%',
}

export default connect(mapStateToProps, actions)(LoginForm);