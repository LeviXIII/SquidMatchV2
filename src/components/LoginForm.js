import React, { Component } from 'react';
import { TextField, Grid, Button } from 'material-ui';
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
        this.props.getMatchingPassword(true);
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

    let showLoginButton = <Button raised style={loginButton}>Login</Button>;
    let showSignupButton = <Button raised style={signupButton}
                              onClick={e => this.showCreateButton(e)}>
                              Sign Up
                            </Button>
    let showCreateAccount = <Button raised style={signupButton}
                              onClick={e => this.setupAccount(e)}>
                              Create Account
                            </Button>

    return (
      <form className="container divBorder formSettings">
        <h1 className="siteTitle">Squid Match</h1>
        <h4 style={subTitle}>Login to find active players to play with</h4>
          <Grid justify="center" container spacing={16}>
            <Grid item xs={2} sm={1} md={1} lg={1}>
              <img className="displayIcon" alt="username-icon" src={squidIcon}/>
            </Grid>
	          <Grid item xs={9}>
              <TextField xs={9} sm={9} md={9} lg={9} fullWidth label="Username" validate
                      name="username" value={this.props.username}
                      onChange={e => this.props.getLoginInput({
                        name: e.target.name, value: e.target.value.replace(/ /g, "")
                      })}>
              </TextField>
            </Grid>
          </Grid>
        
          <Grid justify="center" container spacing={16}>
            <Grid item xs={2} sm={1} md={1} lg={1}>
              <img className="displayIcon" alt="password-icon" src={passwordIcon}/>
            </Grid>
            <Grid item xs={9}>
            <TextField xs={9} sm={9} md={9} lg={9} fullWidth type="password" label="Password"
                    validate name="password" value={this.props.password}
                    onChange={e => this.props.getLoginInput({
                      name: e.target.name, value: e.target.value.replace(/ /g, "")
                    })}>
            </TextField>
            </Grid>
          </Grid>

            {this.props.createButton &&
            <section>
              <Grid justify="center" container spacing={16}>
                <Grid item xs={2} sm={1} md={1} lg={1}>
                  <img className="displayIcon" alt="password-icon" src={passwordIcon}/>
                </Grid>
                <Grid item xs={9}>
                  <TextField xs={9} sm={9} md={9} lg={9} fullWidth type="password" label="Verify Password"
                          validate name="verifyPassword" value={this.props.verifyPassword}
                          onChange={e => this.props.getLoginInput({
                            name: e.target.name, value: e.target.value.replace(/ /g, "")
                          })}>
                  </TextField>
                </Grid>
              </Grid>
            </section>
            }
          <div>
            <br />
            <section className="center-align">
              <p style={messageStyle}>{this.props.verifyMessage}</p>
            </section>
            <br />

            <section className="center-align">
              <Grid justify="center" container spacing={16}>
                {this.props.createButton ? showCreateAccount : showLoginButton}
              </Grid>
              <br />
              <br />
            </section>

            <section className="center-align">
            <Grid justify="center" container spacing={16}>
              {this.props.createButton ? showLoginButton : showSignupButton}
            </Grid>
            </section>
            <br />
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
  fontSize: '1.5rem',
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