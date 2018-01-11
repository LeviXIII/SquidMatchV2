import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import squidIcon from '../images/squidIcon.png';
import passwordIcon from '../images/passwordIcon.png';

class LoginForm extends Component {

  showCreateButton = (e) => {
    e.preventDefault();
    this.props.showCreateButton(true);
    this.props.setVerifyMessage("");
  }

  userLogin = (e) => {
    e.preventDefault();

    axios.post('/login', {
      username: this.props.username,
      password: this.props.password
    })
    .then(result => {
      localStorage.setItem('token', result.data.token);
      this.props.getLoginInput({ name: "username", value: this.props.username});
      this.props.getLoginInput({ name: "password", value: this.props.password});
      this.props.getAccountInput({ name: "NSID", value: result.data.NSID });
      this.props.getAccountInput({ name: "age", value: result.data.age });
      this.props.getAccountInput({ name: "location", value: result.data.location });
      this.props.getAccountInput({ name: "rank", value: result.data.rank });
      this.props.getAccountInput({ name: "mode", value: result.data.mode });
      this.props.getAccountInput({ name: "weapon", value: result.data.weapon });
      this.props.getAccountInput({ name: "playstyle", value: result.data.playstyle });
      this.props.getAccountInput({ name: "status", value: result.data.status });
      this.props.getAccountInput({ name: "notify", value: result.data.notify });
      this.props.getAccountInput({ name: "from", value: result.data.from });
      this.props.getAccountInput({ name: "friendlist", value: result.data.friendlist });
      this.props.setVerifyMessage(result.data.message);
      this.props.setLoggedIn(result.data.setLogin);
    })
    .catch(error => {
      console.log(error);
    })

  }

  setupAccount = (e) => {
    e.preventDefault();
    if (this.props.username !== '') {
      if (this.props.password === this.props.verifyPassword &&
        this.props.password.length >= 8) {
        this.props.setMatchingPassword(true);
        this.props.getLoginInput({name: 'verified', value: true})
      }
      else {
        this.props.setVerifyMessage("Your password doesn't match or is too short.");
      }
    }
    else {
      this.props.setVerifyMessage("Please enter a username.") 
    }
  }

  clearFields = () => {
    this.props.setVerifyMessage("");
    this.props.setInitialAccountState();
  }

  render() {
    //If passwords match for creating account, clear the verify message,
    //setup account state, and allow access to next page.
    if (this.props.matchingPassword && this.props.verified) {
      this.clearFields();
      return <Redirect to="/account-info" />
    }

    if (this.props.isLoggedIn) {
      return <Redirect to="choose-criteria" />
    }

    let showLoginButton = <RaisedButton overlayStyle={loginButton}
                              onClick={e => this.userLogin(e)}>
                              Login
                          </RaisedButton>;
    let showSignupButton = <RaisedButton overlayStyle={signupButton}
                              onClick={e => this.showCreateButton(e)}>
                              Sign Up
                            </RaisedButton>
    let showCreateAccount = <RaisedButton overlayStyle={signupButton}
                              onClick={e => this.setupAccount(e)}>
                              Create Account
                            </RaisedButton>

    return (
      <section className="container divBorder loginFormSettings">
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
                      errorText={this.props.verifyPassword.length < 8 &&
                                "Passwords need to be 8 characters or longer"}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </TextField>
            </section>
            }
            <br />

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
    createButton: state.loginReducer.createButton,
    matchingPassword: state.loginReducer.matchingPassword,
    verified: state.loginReducer.verified,

    isLoggedIn: state.generalReducer.isLoggedIn,
    verifyMessage: state.generalReducer.verifyMessage,
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